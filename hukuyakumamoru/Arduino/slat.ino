/* 服薬守くん ハード側制御　Ver.1.3 */
#include <Servo.h>
int val1; //1入れた検知センサー値格納
int val2; //1取った検知センサー値格納
int val3; //2入れた検知センサー値格納
int val4; //2取った検知センサー値格納
int val5; //3入れた検知センサー値格納
int val6; //3取った検知センサー値格納
int val7; //4入れた検知センサー値格納
int val8; //4取った検知センサー値格納

int data1; //1入れた検知用
int data2; //1取った検知用
int data3; //2入れた検知用
int data4; //2取った検知用
int data5; //3入れた検知用
int data6; //3取った検知用
int data7; //4入れた検知用
int data8; //4取った検知用

int cnt1;  //1入っている個数
int cnt2;  //2入っている個数
int cnt3;  //3入っている個数
int cnt4;  //4入っている個数

int SV1;  //サーボ1動作入力検知用
int SV2;  //サーボ2動作入力検知用
int SV3;  //サーボ3動作入力検知用
int SV4;  //サーボ4動作入力検知用

const int SVIN1 = 22; //サーボ指令受信用入力ピン↓
const int SVIN2 = 24;
const int SVIN3 = 26;
const int SVIN4 = 28;

const int SVOUT1 = 3; //サーボ駆動信号出力ピン↓
const int SVOUT2 = 44;
const int SVOUT3 = 45;
const int SVOUT4 = 46;

const int INCASE1 = A0;  //上部センサー(入れた)用入力ピン↓
const int INCASE2 = A1;
const int INCASE3 = A2;
const int INCASE4 = A3;

const int INCASE1O = 23;  //入れた用出力ピン↓
const int INCASE2O = 25;
const int INCASE3O = 27;
const int INCASE4O = 29;


const int RCVCASE1 = A4;  //下部センサー(取った)用入力ピン↓
const int RCVCASE2 = A5;
const int RCVCASE3 = A8;
const int RCVCASE4 = A7;

const int RCVCASEAO = 31;  //下部センサー統括信号(OR)

Servo servo1; //サーボ名定義↓
Servo servo2;
Servo servo3;
Servo servo4;

void setup() {
  pinMode( SVIN1, INPUT_PULLUP);
  pinMode( SVIN2, INPUT_PULLUP);
  pinMode( SVIN3, INPUT_PULLUP);
  pinMode( SVIN4, INPUT_PULLUP);
  pinMode( SVOUT1, OUTPUT );
  pinMode( SVOUT2, OUTPUT );
  pinMode( SVOUT3, OUTPUT );
  pinMode( SVOUT4, OUTPUT );
  servo1.attach(SVOUT1, 500, 2400);
  servo1.attach(SVOUT2, 500, 2400);
  servo1.attach(SVOUT3, 500, 2400);
  servo1.attach(SVOUT4, 500, 2400);
  Serial.begin(9600);
}
void loop() {
val1 = analogRead(INCASE1); //1番 入れた検知
val2 = analogRead(RCVCASE1); //1番 取った検知
val3 = analogRead(INCASE2); //1番 入れた検知
val4 = analogRead(RCVCASE2); //1番 取った検知
val5 = analogRead(INCASE3); //1番 入れた検知
val6 = analogRead(RCVCASE3); //1番 取った検知
val7 = analogRead(INCASE4); //1番 入れた検知
val8 = analogRead(RCVCASE4); //1番 取った検知

SV1 = digitalRead(2);  //サーボ1起動INPUT

Serial.print(" センサーS1:");
Serial.print(val1);
Serial.print(" センサーR1:");
Serial.print(val2);
Serial.print(" サーボ1:");
Serial.print(SV1);

Serial.print(" センサーS2:");
Serial.print(val3);
Serial.print(" センサーR2:");
Serial.print(val4);
Serial.print(" サーボ2:");
Serial.print(SV2);

Serial.print(" センサーS3:");
Serial.print(val5);
Serial.print(" センサーR3:");
Serial.print(val6);
Serial.print(" サーボ3:");
Serial.print(SV3);

Serial.print(" センサーS4:");
Serial.print(val7);
Serial.print(" センサーR4:");
Serial.print(val8);
Serial.print(" サーボ4:");
Serial.println(SV4);

data1 = val1 - data1;
data2 = val2 - data2;
data3 = val3 - data3;
data4 = val4 - data4;
data5 = val5 - data5;
data6 = val6 - data6;
data7 = val7 - data7;
data8 = val8 - data8;


  if(data1 >= 50){             //1判定出力
    Serial.println("入れた:1");
    digitalWrite(INCASE1O, HIGH); 
    delay(800);
    digitalWrite(INCASE1O, LOW);
  }

  if(data3 >= 50){             //2判定出力
    Serial.println("入れた:1");
    digitalWrite(INCASE2O, HIGH); 
    delay(800);
    digitalWrite(INCASE2O, LOW);
  }
  if(data5 >= 50){             //3判定出力
    Serial.println("入れた:1");
    digitalWrite(INCASE3O, HIGH); 
    delay(800);
    digitalWrite(INCASE3O, LOW);
  }
  if(data7 >= 50){             //4判定出力
    Serial.println("入れた:1");
    digitalWrite(INCASE4O, HIGH); 
    delay(800);
    digitalWrite(INCASE4O, LOW);
  }
 
 
  if( data2 >= 50 || data4 >= 50 || data6 >= 50 || data8 >= 50 ){ //取った判定出力
    Serial.println("取った");
    digitalWrite(RCVCASEAO, HIGH); 
    delay(500);
    digitalWrite(RCVCASEAO, LOW);
  }
  
 data1 = val1;
 data2 = val2;
 data3 = val3;
 data4 = val4;
 data5 = val5;
 data6 = val6;
 data7 = val7;
 data8 = val8;
 
if(SV1 == 1){ //サーボ1駆動
  servo1.write(0);
  delay(1000);
  servo1.write(180);
  delay(1000);
  servo1.write(90);
  delay(500);
}
if(SV1 == 1){ //サーボ2駆動
  servo2.write(0);
  delay(1000);
  servo2.write(180);
  delay(1000);
  servo2.write(90);
  delay(500);
}
if(SV2 == 1){ //サーボ3駆動
  servo3.write(0);
  delay(1000);
  servo3.write(180);
  delay(1000);
  servo3.write(90);
  delay(500);
}
if(SV4 == 1){ //サーボ4駆動
  servo4.write(0);
  delay(1000);
  servo4.write(180);
  delay(1000);
  servo4.write(90);
  delay(500);
}
  delay(100);
}
