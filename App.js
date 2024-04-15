import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen.jsx'
import ProductFormScreen from './Screens/ProductFormScreen.jsx'
import EditProductFormScreen from './Screens/EditProductFormScreen.jsx'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductFormScreen" component={ProductFormScreen} />
      <Stack.Screen name="EditProductFormScreen" component={EditProductFormScreen} />      
    </Stack.Navigator>
  </NavigationContainer>
    )
}

export default App