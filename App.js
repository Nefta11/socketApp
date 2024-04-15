import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import HomeScreen from "./Screens/HomeScreen.jsx";
import ProductFormScreen from "./Screens/ProductFormScreen.jsx";
import EditProductFormScreen from "./Screens/EditProductFormScreen.jsx";
import Footer from "./Screens/Footer.jsx";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            header: () => (
              <View
                style={{
                  backgroundColor: "#F2B950",
                  alignItems: "center",
                  paddingTop: 45,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "black", fontSize: 28 }}
                >
                  API SOCKETS®
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingVertical: 10,
                  }}
                ></View>
              </View>
            ),
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="ProductFormScreen"
          component={ProductFormScreen}
          options={{
            title: "Agregar un nuevo jersey",
            headerStyle: {
              backgroundColor: "#F2B950",
            },
            headerTitleStyle: { fontWeight: "bold", color: "#000" },
            headerTintColor: "#000",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="EditProductFormScreen"
          component={EditProductFormScreen}
          options={{
            title: "Editar producto",
            headerStyle: {
              backgroundColor: "#F2B950",
            },
            headerTitleStyle: { fontWeight: "bold", color: "#000" },
            headerTintColor: "#F2B950",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

/*                  <TouchableOpacity onPress={() => navigation.navigate('PrincipalScreen')} style={{ paddingHorizontal: 60 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>Inicio</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('ProductFormScreen')} style={{ paddingHorizontal: 60 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>Nuevo</Text>
                  </TouchableOpacity> */

export default App;
