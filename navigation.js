import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ImagemScreen from "./ImageScreen";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View,StyleSheet } from "react-native";
import MapaScreen from "./screens/MapaScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";
import InstaScreen from "./screens/Insta";
import LocationScreen from "./LocationScreen";


const Stack = createNativeStackNavigator();

const globalScreenOptions = {
    headerStyle: { backgroundColor: "#2C6BED" },
    headerTintColor: "white",
    headerTintStyle: "white",
  
    headerRight: () => {
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          width: 80,
          marginRight: 20,
        }}
      >
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="camerao" size={24} color="black" />
        </TouchableOpacity>
      </View>;
    },
  };
  
export const SignInStack = () => (

    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName="login">
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="imagem" component={ImagemScreen} />
        <Stack.Screen name="mapa" component={MapaScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="addchat" component={AddChatScreen} />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen name="foto" component={ImagemScreen} />
        <Stack.Screen name="insta" component={InstaScreen} />

      </Stack.Navigator>
    </NavigationContainer>

)
export const SignedOutStack = () => (
  

    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )


