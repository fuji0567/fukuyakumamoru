### 毎日0時に実行してflagをリセットする用

from pymongo import MongoClient
import RPi.GPIO as GPIO


# db接続
client = MongoClient('mongodb://160.16.222.38:22238')
db = client.hukuyakumamorukun

# collection取得
tak_med = db.istakemedicines

# データリセット
tak_med.update_one({}, {"$set": {"morning.isImageComplete": False, "morning.isCupComplete": False, 
                                 "afternoon.isImageComplete": False, "afternoon.isCupComplete": False, 
                                 "evening.isImageComplete": False, "evening.isCupComplete": False, 
                                 "night.isImageComplete": False, "night.isCupComplete": False}})
