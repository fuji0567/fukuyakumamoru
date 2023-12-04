# cronにて毎分実行

from pymongo import MongoClient
import RPi.GPIO as GPIO
import datetime
import locale
import time as sleep
import urllib.request, json
import schedule

def main():
    # GPIOのPINを指定
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(17, GPIO.OUT, initial=GPIO.LOW) # 朝 17
    GPIO.setup(27, GPIO.OUT, initial=GPIO.LOW) # 昼 27
    GPIO.setup(22, GPIO.OUT, initial=GPIO.LOW) # 夕 22
    GPIO.setup(10, GPIO.OUT, initial=GPIO.LOW) # 夜 10

    # db接続
    client = MongoClient('mongodb://160.16.222.38:22238')
    db = client.hukuyakumamorukun

    # collection取得
    set_time = db.settingtimes
    put_med = db.putmedicines

    # 曜日文字列取得
    locale.setlocale(locale.LC_TIME, 'en_US.UTF-8')
    en_day = datetime.datetime.now().strftime("%A").lower()
    locale.setlocale(locale.LC_TIME, 'ja_JP.UTF-8')
    jp_day = datetime.datetime.now().strftime("%a").lower()

    # 今の時間を取得
    now = datetime.datetime.now().time()
    print(now)

    # settingtimes
    st = set_time.find_one()[en_day]
    times = [datetime.time(int(st["morning"]["time"][:2]), int(st["morning"]["time"][3:5]), 59), 
            datetime.time(int(st["afternoon"]["time"][:2]), int(st["afternoon"]["time"][3:5]), 59),
            datetime.time(int(st["evening"]["time"][:2]), int(st["evening"]["time"][3:5]), 59),
            datetime.time(int(st["night"]["time"][:2]), int(st["night"]["time"][3:5]), 59)]
    print(times[3])

    # 次の服薬予定確認
    if now <= times[0] or times[3] < now:
        time = 0 # つぎの服薬予定は朝
        pin = 17
    elif times[1] > now:
        time = 1 # つぎの服薬予定は昼
        pin = 27
    elif times[2] > now:
        time = 2 # つぎの服薬予定は夕
        pin = 22
    else:
        time = 3 # つぎの服薬予定は夜
        pin = 10

    print("output: "+str(now.hour)+":"+str(now.minute))
    print("output: "+str(times[time].hour)+":"+str(times[time].minute))
    if int(times[time].hour) == int(now.hour) and int(times[time].minute) == int(now.minute):
        print("output")
        GPIO.output(pin, 1)
        sleep.sleep(2)
        GPIO.output(pin, 0)
        timing = ["morning", "afternoon", "evening", "night"]
        put_med.update_one({}, {"$set": {en_day+"."+timing[time]: False}})

        timing = ["朝", "昼", "夕方", "夜"]
        url = "https://exp.host/--/api/v2/push/send"
        method = "POST"
        headers = {
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json'
        }
        body = {
            "to": "ExponentPushToken[yoSEpYCM4BXVay1Dlnu4HK]",
            # "to": "ExponentPushToken[MB3lwBKaGyGLkKjR3NdIDb]",
            "title": "薬の排出",
            "body": timing[time]+"の分の薬を排出しました",
        }
        json_data = json.dumps(body).encode("utf-8")
        request = urllib.request.Request(url, data=json_data, method=method, headers=headers)
        with urllib.request.urlopen(request) as response:
            response_body = response.read().decode("utf-8")

        GPIO.cleanup()

schedule.every(1).minutes.do(main)
while True:
    schedule.run_pending()
    sleep.sleep(1)
