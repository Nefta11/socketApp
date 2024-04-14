import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import WebSocket from 'react-native-websocket';

export default function App() {
  const [potentiometerValue, setPotentiometerValue] = useState('0');
  const [ledState, setLedState] = useState(false);
  const [ws, setWs] = useState(null); // Inicializamos ws como null

  useEffect(() => {
  }, []);

  const handleData = (message) => {
    setPotentiometerValue(message.data);
  };

  const toggleLed = (value) => {
    setLedState(value);
    const message = value ? "on" : "off";
    
    // Verificamos si ws está inicializado
    if (ws && ws.send) {
      ws.send(message);
    } else {
      console.log("WebSocket no está inicializado");
    }
  };

  const onOpen = (event) => {
    console.log("Conexión WebSocket abierta");
    // Guardamos la instancia de WebSocket
    setWs(event.target);
  };

  return (
    <View style={styles.container}>
      <Text>Valor del potenciómetro:</Text>
      <Text style={styles.value}>{potentiometerValue}</Text>

      <Switch
        value={ledState}
        onValueChange={toggleLed}
      />

      <WebSocket
        url="ws://192.168.1.77:81"
        onOpen={onOpen} // Utilizamos la función onOpen para establecer ws
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
