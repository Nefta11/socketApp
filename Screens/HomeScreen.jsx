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
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Valor del potenciómetro</Text>
        <Text style={styles.value}>{potentiometerValue} Ω</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Temperatura actual</Text>
        <Text style={styles.value}>{temperatureValue} °C</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Objeto detectado</Text>
        <Text style={styles.objectDetected}>{objectDetected ? 'Sí' : 'No'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Distancia al objeto</Text>
        <Text style={styles.value}>{distance} cm</Text>
      </View>

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
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  objectDetected: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f', // color rojo si se detecta un objeto
  },
});
