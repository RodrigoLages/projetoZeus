import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Form() {
  return (
    <View style={styles.container}>
      <Text>Form!</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(250, 65%, 88%)",
    alignItems: "center",
    justifyContent: "center",
  },
});
