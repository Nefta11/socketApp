import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WebSocket from 'react-native-websocket';

export default function App() {
  const [potentiometerValue, setPotentiometerValue] = useState('0');

  useEffect(() => {
    return () => {
      ws.close();
    };
  }, []);

  const handleData = (data) => {
    setPotentiometerValue(data);
  };

  return (
    <View style={styles.container}>
      <Text>Valor del potenciómetro:</Text>
      <Text style={styles.value}>{potentiometerValue}</Text>

      <WebSocket
        url="ws://tu-direccion-ip-del-ESP8266:81"
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
