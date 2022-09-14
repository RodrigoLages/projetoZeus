import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function List() {
  return (
    <View style={styles.container}>
      <Text>List!</Text>
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
