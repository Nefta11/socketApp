import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { WebSocket } from 'your-websocket-library'; // Importa el módulo de WebSocket que estés usando

export default function App() {
  const [potentiometerValue, setPotentiometerValue] = useState('0');

  useEffect(() => {
    const ws = new WebSocket('ws://tu-direccion-ip-del-ESP8266:81');

    ws.onopen = () => {
      console.log('WebSocket conectado');
    };

    ws.onmessage = (event) => {
      setPotentiometerValue(event.data);
    };

    ws.onerror = (error) => {
      console.log('Error de WebSocket:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Valor del potenciómetro:</Text>
      <Text style={styles.value}>{potentiometerValue}</Text>
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
