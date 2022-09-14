import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Form from "./Form";
import List from ".//List";

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: "#32264d",
          tabBarInactiveTintColor: "#c1bccc",
          tabBarActiveBackgroundColor: "#ebebf5",
          tabBarInactiveBackgroundColor: "#fafafc",
          tabBarLabelStyle: {
            fontSize: 13,
            position: "absolute",
            top: 15,
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarIconStyle: { display: "none" },
        }}
      >
        <Screen
          name="Form"
          component={Form}
          options={{ tabBarLabel: "Novo Gasto" }}
        />
        <Screen
          name="List"
          component={List}
          options={{ tabBarLabel: "Gastos do mês" }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
