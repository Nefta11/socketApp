import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WebSocket from 'react-native-websocket';

export default function App() {
  const [potentiometerValue, setPotentiometerValue] = useState('0');

  useEffect(() => {
    // No es necesario cerrar manualmente el WebSocket aquí
    // El componente WebSocket manejará su propio cierre cuando sea necesario
    // No necesitas devolver ninguna función de limpieza ya que no hay suscripciones o temporizadores en este caso
  }, []);

  const handleData = (message) => {
    setPotentiometerValue(message.data);
  };

  return (
    <View style={styles.container}>
      <Text>Valor del potenciómetro:</Text>
      <Text style={styles.value}>{potentiometerValue}</Text>

      <WebSocket
        url="ws://192.168.1.77:81"
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
