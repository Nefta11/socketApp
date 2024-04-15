/*
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WebSocketsServer.h>
#include <DHT.h>

ESP8266WiFiMulti WiFiMulti;
WebSocketsServer webSocket = WebSocketsServer(81);

#define DHTPIN 0
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

const int potentiometerPin = A0;
int trigPin = 5;
int echoPin = 4;
long duration;
float cm;

void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length) {
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  WiFiMulti.addAP("INFINITUM8EB8", "Yw5Jg6Sq8e");

  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }

  Serial.println("Conexión exitosa a la red WiFi!");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());

  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  dht.begin();

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  webSocket.loop();
  delay(80);

  // Leer temperatura
  float t = dht.readTemperature();
  if (isnan(t)) {
    Serial.println(F("Falla en la lectura del sensor!"));
  } else {
    Serial.print(F("Temperatura: "));
    Serial.print(t);
    Serial.println(F("°C"));

    // Leer valor del potenciómetro
    int potentiometerValue = analogRead(potentiometerPin);
    int normalizedValue = map(potentiometerValue, 0, 1023, 1, 100);
    String message = String(normalizedValue) + "," + String(t);
  
    // Medir distancia con el sensor ultrasónico
    digitalWrite(trigPin, LOW);
    delayMicroseconds(5);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH);
    cm = (duration/2) / 29.1;

    // Agregar distancia al mensaje
    message += "," + String(cm);

    webSocket.broadcastTXT(message);
  }

  delay(80);
}
*/