#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLEServer *pServer = NULL;
BLECharacteristic * pTxCharacteristic;
bool deviceConnected = false;
bool oldDeviceConnected = false;

// #define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // UART service UUID
#define SERVICE_UUID           "a0528e0c-fa04-4615-af30-866c3951536d"
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
//#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "cd4e5793-eb97-4364-8193-4f5fcb7ef69b"

class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
  };

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
  }
};

void setup() {
  Serial.begin(115200);

  // Create the BLE Device
  BLEDevice::init("ESP32 gyro-device");

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pTxCharacteristic = pService->createCharacteristic(
										CHARACTERISTIC_UUID_TX,
										BLECharacteristic::PROPERTY_NOTIFY
									);
                      
  pTxCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  pService->start();

  // Start advertising
  pServer->getAdvertising()->start();
  Serial.println("Waiting a client connection to notify...");
}

void loop() {
  if (deviceConnected) {
    //3-axis sensor
    float x = analogRead(A0);
    float y = analogRead(A3);
    float z = analogRead(A6);

    //Create data to send
    char stheta1[16];
    char stheta2[16];

    float theta1 = atan2(z-1900,x-1900)*180/PI;
    float theta2 = atan2(y-1900,z-1900)*180/PI;
    theta1 = abs(abs(theta1)-90);
    theta2 = abs(theta2);

    String strTheta1 = String(theta1,2);
    String s1 = "1:";
    s1.concat(strTheta1);
    s1.toCharArray(stheta1, s1.length());

    String strTheta2 = String(theta2,2);
    String s2 = "2:";
    s2.concat(strTheta2);
    s2.toCharArray(stheta2, s2.length());

    //Send data
    pTxCharacteristic->setValue(&stheta1[0]);
    pTxCharacteristic->notify();
    pTxCharacteristic->setValue(&stheta2[0]);
    pTxCharacteristic->notify();

    delay(100); 
	}

  // disconnecting
  if (!deviceConnected && oldDeviceConnected) {
    delay(500); // give the bluetooth stack the chance to get things ready
    pServer->startAdvertising(); // restart advertising
    Serial.println("start advertising");
    oldDeviceConnected = deviceConnected;
  }
  
  // connecting
  if (deviceConnected && !oldDeviceConnected) {
    // do stuff here on connecting
    oldDeviceConnected = deviceConnected;
  }
}
