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
                  backgroundColor: "#53A7F4",
                  alignItems: "center",
                  paddingTop: 45,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 28 }}
                >
                  API Sockets IoT
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
            title: "En espera",
            headerStyle: {
              backgroundColor: "#53A7F4",
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
            title: "En espera",
            headerStyle: {
              backgroundColor: "#53A7F4",
            },
            headerTitleStyle: { fontWeight: "bold", color: "#000" },
            headerTintColor: "red",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default App;
