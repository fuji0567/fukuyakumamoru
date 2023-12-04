import datetime
import locale
from pymongo import MongoClient
import urllib.request, json
import asyncio
from bleak import BleakScanner, BleakClient

# ESP32のデバイスを識別するためのUUID 
ESP32_UUIDs = ["34:85:18:9D:72:59"]
#ESP32_UUIDs = ["C0:49:EF:67:FD:DA"]

# Nordic UART Service (NUS)
# NUS_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
# RX_UUID = '93222d1f-2837-4f1d-88d0-e30b6d1935e1'
global gyro
global date
gyro = ""
date = [0, 0]


# コールバック関数: データが送信されたときに呼び出される
def notification_handler(sender: int, data: bytearray, **_kwargs):
    global gyro
    global date
    gyro = data.decode()

    print(gyro)
    
    if gyro[0] == "1":
        date[0] = float(gyro[2:])
    else:
        date[1] = float(gyro[2:])

async def run():

    # 周囲のBLE発信をスキャン
    scanner = BleakScanner()
    devices = await scanner.discover()

    clients = []
    for device in devices:
        print(f'name:{device.name},address:{device.address}')
        if device.address in ESP32_UUIDs:
            client = BleakClient(device)
            clients.append(client)


    try:
        
        # ESP32とデータのやり取りをする
        for client in clients:
            await client.connect()

            # Characteristicの情報を得る
            for service in client.services:
                print('---------------------')
                print(f"service uuid:{service.uuid}, description:{service.description}")
                [print(f'{c.properties},{c.uuid}',) for c in service.characteristics]
            
            #await client.start_notify('93222d1f-2837-4f1d-88d0-e30b6d1935e1', notification_handler)
                await client.start_notify('cd4e5793-eb97-4364-8193-4f5fcb7ef69b', notification_handler)
            
        global date
        while True:
            if date[0] >= 30 or date[1] >= 30:
                break
            await asyncio.sleep(1.0)
    finally:
        print("finish")

asyncio.run(run())


# db接続
client = MongoClient('mongodb://160.16.222.38:22238')
db = client.hukuyakumamorukun

# collection取得
tak_med = db.istakemedicines
cmp_num = db.completednumbers
set_time = db.settingtimes

# 曜日文字列取得
locale.setlocale(locale.LC_TIME, 'en_US.UTF-8')
en_day = datetime.datetime.now().strftime("%A").lower()
locale.setlocale(locale.LC_TIME, 'ja_JP.UTF-8')
jp_day = datetime.datetime.now().strftime("%a").lower()

# 今の時間を取得
now = datetime.datetime.now().time()

# settingtimes
st = set_time.find_one()[en_day]
times = [datetime.time(int(st["morning"]["time"][:2]), int(st["morning"]["time"][4:5])), 
        datetime.time(int(st["afternoon"]["time"][:2]), int(st["afternoon"]["time"][4:5])),
        datetime.time(int(st["evening"]["time"][:2]), int(st["evening"]["time"][4:5])),
        datetime.time(int(st["night"]["time"][:2]), int(st["night"]["time"][4:5]))]

# 前回の服薬時刻
if now >= times[3] or times[0] > now:
    time = 3 # 前回の服薬時刻は夜
elif times[1] > now:
    time = 0 # 前回の服薬時刻は朝
elif times[2] > now:
    time = 1 # 前回の服薬時刻は昼
else:
    time = 2 # 前回の服薬時刻は夕

timing = ["morning", "afternoon", "evening", "night"]

tak_med.update_one({}, {"$set": {timing[time]+".isCupComplete": True}})
d_today =  str(datetime.date.today())

if tak_med.find_one()[timing[time]]["isImageComplete"]:
    completednumbers = cmp_num.find_one({"data": d_today})
    if completednumbers == None:
        cmp_num.insert_one({"data": d_today, "completedNumber": 0})
        completednumbers = cmp_num.find_one({"data": d_today})

    completedNumber = cmp_num.find_one({"data": d_today})["completedNumber"]
    cmp_num.update_one({"data": d_today}, {"$set": {"completedNumber": completedNumber+1}})

    timing = ["朝", "昼", "夕", "夜"]

    # アプリの通知
    url = "https://exp.host/--/api/v2/push/send"
    method = "POST"
    headers = {
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
    }
    body = {
        "to": "ExponentPushToken[MB3lwBKaGyGLkKjR3NdIDb]",
        "title": "薬の服用確認",
        "body": timing[time]+"の分の薬が服用されたことを確認しました",
    }
    json_data = json.dumps(body).encode("utf-8")
    request = urllib.request.Request(url, data=json_data, method=method, headers=headers)
    with urllib.request.urlopen(request) as response:
        response_body = response.read().decode("utf-8")
