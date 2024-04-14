import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import WebSocket from 'react-native-websocket';

export default function App() {
  const [potentiometerValue, setPotentiometerValue] = useState('0');

  useEffect(() => {
  }, []);

  const handleData = (message) => {
    setPotentiometerValue(message.data);
  };

  const onOpen = (event) => {
    console.log("Conexión WebSocket abierta");
    setWs(event.target);
  };

  return (
    <View style={styles.container}>
      <Text>Valor del potenciómetro:</Text>
      <Text style={styles.value}>{potentiometerValue}</Text>

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
