import cv2
import mediapipe as mp
import time
import locale
import datetime
from pymongo import MongoClient
import urllib.request, json

mp_hands = mp.solutions.hands
mp_face_detection = mp.solutions.face_detection
hands = mp_hands.Hands()
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)  # 顔の検出信頼度を設定

cap = cv2.VideoCapture(0)

prev_time = 0

warning_count = 0

warning_inactive = True

last_warning_time = 0

flag = False

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        continue

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    current_time = time.time()

    results_hands = hands.process(frame_rgb)
    hand_coordinates = []
    if results_hands.multi_hand_landmarks:
        for hand_landmarks in results_hands.multi_hand_landmarks:

            for point in hand_landmarks.landmark:
                x, y = int(point.x * frame.shape[1]), int(point.y * frame.shape[0])
                hand_coordinates.append((x, y))

    if current_time - prev_time >= 1:
        prev_time = current_time

    results_face = face_detection.process(frame_rgb)

    if results_face.detections:
        for detection in results_face.detections:
            bboxC = detection.location_data.relative_bounding_box
            ih, iw, _ = frame.shape
            x, y, w, h = int(bboxC.xmin * iw), int(bboxC.ymin * ih), \
                         int(bboxC.width * iw), int(bboxC.height * ih)
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    results_hands = hands.process(frame_rgb)
    if results_hands.multi_hand_landmarks:
        for hand_landmarks in results_hands.multi_hand_landmarks:

            for point in hand_landmarks.landmark:
                x, y = int(point.x * frame.shape[1]), int(point.y * frame.shape[0])
                cv2.circle(frame, (x, y), 5, (0, 0, 255), -1)

    results_face = face_detection.process(frame_rgb)
    face_coordinates = []
    if results_face.detections:
        for detection in results_face.detections:
            bboxC = detection.location_data.relative_bounding_box
            ih, iw, _ = frame.shape
            x, y, w, h = int(bboxC.xmin * iw), int(bboxC.ymin * ih), \
                         int(bboxC.width * iw), int(bboxC.height * ih)
            face_coordinates.append((x, y, w, h))

    for (hx, hy) in hand_coordinates:
        for (fx, fy, fw, fh) in face_coordinates:
            if fx <= hx <= fx + fw and fy <= hy <= fy + fh:
                warning_count += 1
                if warning_count >= 10 and current_time - last_warning_time >= 1:
                    last_warning_time = current_time
                    flag = True
                break


        if warning_inactive:
            cv2.putText(frame, "", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)
        else:
            if warning_count >= 10:
                flag = True
            else:
                warning_inactive = True

    if flag:
        break

cap.release()
cv2.destroyAllWindows()

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

tak_med.update_one({}, {"$set": {str(timing[time])+".isImageComplete": True}})
d_today =  str(datetime.date.today())

if tak_med.find_one()[timing[time]]["isCupComplete"]:
    completednumbers = cmp_num.find_one({"data": d_today})
    if completednumbers == None:
        cmp_num.insert_one({"data": d_today, "completedNumber": 0})
        completednumbers = cmp_num.find_one({"data": d_today})

    completedNumber = cmp_num.find_one({"data": d_today})["completedNumber"]
    cmp_num.update_one({"data": d_today}, {"$set": {"completedNumber": completedNumber+1}})

    timing = ["朝", "昼", "夕方", "夜"]
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
