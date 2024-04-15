import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import WebSocket from 'react-native-websocket';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

export default function App() {
  const [potentiometerValue, setPotentiometerValue] = useState('0');
  const [temperatureValue, setTemperatureValue] = useState('0');
  const [objectDetected, setObjectDetected] = useState(false);
  const [distance, setDistance] = useState(0);
  const navigation = useNavigation(); // Obtiene el objeto de navegación

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

  const guardarDatos = () => {
    // Aquí puedes implementar la lógica para guardar los datos
    console.log('Datos guardados');
  };

  const verJSON = () => {
    navigation.navigate('JsonFormScreen'); // Navega a la vista JsonFormScreen
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

      <View style={[styles.card, objectDetected ? styles.objectDetectedCard : styles.noObjectDetectedCard]}>
        <Text style={styles.cardTitle}>Objeto detectado</Text>
        <Text style={objectDetected ? styles.objectDetected : styles.value}>{objectDetected ? 'Sí' : 'No'}</Text>
        <Text style={styles.cardTitle}>Distancia al objeto</Text>
        <Text style={styles.value}>{distance} cm</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={guardarDatos}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={verJSON}>
          <Text style={styles.buttonText}>Ver JSON</Text>
        </TouchableOpacity>
      </View>

      <WebSocket
       // url="ws://192.168.1.77:81"
        url="ws://192.168.144.128:81"
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
    backgroundColor: '#F3E4E2',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
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
    color: '#d32f2f', 
  },
  objectDetectedCard: {
    backgroundColor: '#ffebee', // Rojo claro
  },
  noObjectDetectedCard: {
    backgroundColor: '#c8e6c9', // Verde claro
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#d32f2f',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
