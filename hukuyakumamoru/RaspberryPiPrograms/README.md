# プログラム概要  
・[reset-istakemedicines.py](https://github.com/ao320/hukuyakumamoru/blob/main/RaspberryPiPrograms/reset-istakemedicines.py)  
　0時に実行 データベースにおける、その日薬を飲んだかのフラグをリセットする  
・[OutputGpio.py](https://github.com/ao320/hukuyakumamoru/blob/main/RaspberryPiPrograms/OutputGpio.py)  
　1分毎実行 薬排出の設定時刻であればGPIOで信号を送り、薬残量のデータベースを更新  
・[PutMedicine.py](https://github.com/ao320/hukuyakumamoru/blob/main/RaspberryPiPrograms/PutMedicine.py)  
　起動後常に実行 新しく薬が補充された信号を検知し、データベースを更新する  
・[TakeOutMedicine.py](https://github.com/ao320/hukuyakumamoru/blob/main/RaspberryPiPrograms/TakeOutMedicine.py)  
　起動後常に実行 薬排出後、取り出された信号を検知し、 CameraAI・ReciveCupdateを起動する  
・[CameraAI.py](https://github.com/ao320/hukuyakumamoru/blob/main/RaspberryPiPrograms/CameraAI.py)  
　USBカメラの映像から顔・手の位置を認識し、薬の服用を判別する  
・[ReciveCupdate.py](https://github.com/ao320/hukuyakumamoru/blob/main/RaspberryPiPrograms/ReciveCupdate.py)  
　コップデバイス内部のEPS32と通信し、ジャイロセンサの値からコップの使用を判別する  

# 参考リンク  
[PythonでMongoDBを操作する（PyMongo）](https://python-work.com/pymongo/)  

[【OpenCV-Python】Webカメラから画像をキャプチャして保存する](https://imagingsolution.net/program/python/opencv-python/opencv_videocapture/)

[Raspberry Pi のGPIOをPythonから利用する](https://qiita.com/maoutokagura/items/9aef5e23167ce2bc1d10)

[BLE接続でESP32とラズパイで相互通信する①](https://zenn.dev/yuta_enginner/articles/826f7bc384e2b7)

[Pythonでデバイスを制御しよう【第2回】プッシュボタンを扱う(4)](https://deviceplus.jp/mc-general/control-device-with-python-vol2-04/#02)

[Ubuntuで起動時に自動でShellScriptを実行する方法](https://qiita.com/MAI_onishi/items/74edc40a667dd2dc633e)  

[ubuntuでのcronの設定方法](https://zenn.dev/naco/articles/1ad49495af9ea9)  

[【Ubuntu 18.04 LTS Server】定期的に再起動させる](https://www.yokoweb.net/2019/07/07/ubuntu-server-cron-reboot/)