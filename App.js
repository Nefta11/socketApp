import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WebSocket from 'react-native-websocket';

export default function App() {
  const [potentiometerValue, setPotentiometerValue] = useState('0');
  const [temperatureValue, setTemperatureValue] = useState('0');
  const [objectDetected, setObjectDetected] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
  }, []);

  const handleData = (message) => {
    const data = message.data.split(',');
    setPotentiometerValue(data[0]);
    setTemperatureValue(data[1]);
    setDistance(data[2]);
    setObjectDetected(data[2] < 20); // Suponiendo que la detección se realiza a menos de 20 cm
  };

  const onOpen = (event) => {
    console.log("Conexión WebSocket abierta");
  };

  return (
    <View style={styles.container}>
      <Text>Valor del potenciómetro:</Text>
      <Text style={styles.value}>{potentiometerValue} Ω</Text>

      <Text>Temperatura actual:</Text>
      <Text style={styles.value}>{temperatureValue} °C</Text>

      <Text>Objeto detectado: {objectDetected ? 'Sí' : 'No'}</Text>
      <Text>Distancia al objeto:</Text>
      <Text style={styles.value}>{distance} cm</Text>

      <WebSocket
        url="ws://192.168.1.77:81"
        onOpen={onOpen}
        onMessage={handleData}
        onError={(error) => console.log('Error de WebSocket:', error)}
        reconnect={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
