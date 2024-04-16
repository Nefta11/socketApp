import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // Importa Alert desde 'react-native'
import WebSocket from 'react-native-websocket';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage desde la nueva ubicación
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { insertList } from '../api'; // Importa la función insertList desde el archivo api.js

export default function App() {
  const [valorPotenciometro, setValorPotenciometro] = useState('0');
  const [TemperaturaActual, setTemperaturaActual] = useState('0');
  const [objetoDetectado, setObjetoDetectado] = useState(false);
  const [DistanciaObjeto, setDistanciaObjeto] = useState(0);
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  useEffect(() => {
  }, []);

  const handleData = (message) => {
    const data = message.data.split(',');
    setValorPotenciometro(data[0]);
    setTemperaturaActual(data[1]);
    setDistanciaObjeto(data[2]);
    setObjetoDetectado(data[2] < 20); // Suponiendo que la detección se realiza a menos de 20 cm
  };

  const onOpen = (event) => {
    console.log("Conexión WebSocket abierta");
  };

  const generarCodigoAleatorio = () => {
    return Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio de 4 dígitos
  };

  const guardarDatos = async () => {
    try {
      const codigo = generarCodigoAleatorio(); // Genera el código aleatorio
      const datosAGuardar = {
        code: codigo, // Inserta el código aleatorio
        valorPotenciometro,
        TemperaturaActual,
        objetoDetectado: objetoDetectado ? 'Sí' : 'No', // Representa "Sí" o "No" en lugar de true o false
        DistanciaObjeto
      };

      // Guardar los datos localmente
      await AsyncStorage.setItem('datosGuardados', JSON.stringify(datosAGuardar));

      // Enviar los datos a la base de datos a través de la API
      await insertList(datosAGuardar);
      
      console.log('Datos guardados y enviados a la base de datos:', datosAGuardar);

      // Mostrar alerta de guardado exitoso
      Alert.alert('Guardado exitoso', 'Los datos se han guardado correctamente.');

    } catch (error) {
      console.error('Error al guardar los datos:', error);
      // Mostrar alerta de error si ocurre algún problema
      Alert.alert('Error', 'Ha ocurrido un error al intentar guardar los datos.');
    }
  };

  const verJSON = () => {
    navigation.navigate('JsonFormScreen'); // Navega a la vista JsonFormScreen
  };

  // Estilo dinámico para la tarjeta del potenciómetro
  const potenciometroStyle = {
    backgroundColor: `rgba(255, 0, 0, ${parseFloat(valorPotenciometro) / 100})`, // Color rojo con opacidad cambiante según el valor del potenciómetro
  };
 
  const temperaturaStyle = {
    backgroundColor: getBackgroundColor(TemperaturaActual)
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.card, potenciometroStyle]}>
        <Text style={styles.cardTitle}>Valor del potenciómetro</Text>
        <Text style={styles.value}>{valorPotenciometro} Ω</Text>
      </View>

      <View style={[styles.card, temperaturaStyle]}>
        <Text style={styles.cardTitle}>Temperatura actual</Text>
        <Text style={styles.value}>{TemperaturaActual} °C</Text>
      </View>

      <View style={[styles.card, objetoDetectado ? styles.objetoDetectadoCard : styles.noObjetoDetectadoCard]}>
        <Text style={styles.cardTitle}>Objeto detectado</Text>
        <Text style={objetoDetectado ? styles.objetoDetectado : styles.value}>{objetoDetectado ? 'Sí' : 'No'}</Text>
        <Text style={styles.cardTitle}>Distancia al objeto</Text>
        <Text style={styles.value}>{DistanciaObjeto} cm</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={guardarDatos}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={verJSON}>
          <Text style={styles.buttonText}>Ver Lista</Text>
        </TouchableOpacity>
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
    backgroundColor: '#F3E4E2',
  },
  card: {
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
  objetoDetectado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f', 
  },
  objetoDetectadoCard: {
    backgroundColor: '#ffebee', // Rojo claro
  },
  noObjetoDetectadoCard: {
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
const getBackgroundColor = (temp) => {
  const tempValue = parseFloat(temp);
  if (tempValue < 0) {
    return 'white'; // Muy frío
  } else if (tempValue >= 0 && tempValue < 10) {
    return 'lightblue'; // Frío
  } else if (tempValue >= 10 && tempValue < 15) {
    return '#87CEFA'; // Azul Claro
  } else if (tempValue >= 15 && tempValue < 20) {
    return '#6495ED'; // Azul
  } else if (tempValue >= 20 && tempValue < 20.5) {
    return '#FFFF00'; // Amarillo Claro
  } else if (tempValue >= 20.5 && tempValue < 21) {
    return '#FFFF33'; // Amarillo
  } else if (tempValue >= 21 && tempValue < 21.5) {
    return '#FFFF66'; // Amarillo
  } else if (tempValue >= 21.5 && tempValue < 22) {
    return '#FFFF99'; // Amarillo
  } else if (tempValue >= 22 && tempValue < 22.5) {
    return '#FFFFCC'; // Amarillo
  } else if (tempValue >= 22.5 && tempValue < 23) {
    return '#FFEB3B'; // Amarillo
  } else if (tempValue >= 23 && tempValue < 23.5) {
    return '#FFE066'; // Amarillo
  } else if (tempValue >= 23.5 && tempValue < 24) {
    return '#FFD700'; // Naranja Claro
  } else if (tempValue >= 24 && tempValue < 24.5) {
    return '#FFA500'; // Naranja
  } else if (tempValue >= 24.5 && tempValue < 25) {
    return '#FF8C00'; // Naranja
  } else if (tempValue >= 25 && tempValue < 25.5) {
    return '#FF6347'; // Naranja
  } else if (tempValue >= 25.5 && tempValue < 26) {
    return '#FF4500'; // Naranja
  } else if (tempValue >= 26 && tempValue < 26.5) {
    return '#FF3333'; // Naranja
  } else if (tempValue >= 26.5 && tempValue < 27) {
    return '#FF0000'; // Rojo
  } else if (tempValue >= 27 && tempValue < 27.5) {
    return '#FF0000'; // Rojo
  } else if (tempValue >= 27.5 && tempValue < 28) {
    return '#FF1000'; // Rojo
  } else if (tempValue >= 28 && tempValue < 30) {
    return '#FF1100'; // Rojo
  } else {
    return '#FF1111'; // Caliente (a partir de 30)
  }
};
