import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getLists, deleteList } from '../api'; // Importa las funciones de la API

const JsonFormScreen = ({ navigation }) => {
  const [lists, setLists] = useState([]);

  // Obtiene las listas de la API cuando el componente se monta
  useEffect(() => {
    fetchLists();
  }, []);

  // Función para obtener las listas desde la API
  const fetchLists = async () => {
    try {
      const response = await getLists();
      setLists(response); // Actualiza el estado con las listas obtenidas
    } catch (error) {
      console.error('Error al obtener las listas:', error);
    }
  };

  // Función para eliminar un elemento de la lista
  const handleDeleteListItem = async (code) => {
    try {
      await deleteList(code);
      // Después de eliminar, obtener las listas actualizadas
      fetchLists();
    } catch (error) {
      console.error('Error al eliminar el elemento de la lista:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {lists.map((item) => (
        <View key={item.code} style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.textItem}>Valor del potenciómetro:  {item.valorPotenciometro} Ω</Text>
            <Text style={styles.textItem}>Temperatura actual: {item.TemperaturaActual} °C</Text>
            <Text style={styles.textItem}>Objeto detectado: {item.objetoDetectado}</Text>
            <Text style={styles.textItem}>Distancia al objeto:  {item.DistanciaObjeto} cm</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => handleDeleteListItem(item.code)}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '70%',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginBottom: 22,
    padding: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardBody: {
    marginBottom: 10,
  },
  textItem: {
    fontSize: 18,
    marginBottom: 7,
    color: '#555',
    textAlign: 'center',
  },
  buttonDelete: {
    backgroundColor: '#ff5f5f',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default JsonFormScreen;
