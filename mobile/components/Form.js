import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Datepicker from "./Datepicker";

export default function Form(props) {
  const handleSubmit = () => {
    const obj = {
      cost: props.cost,
      obs: props.obs,
      date: props.selectedDate,
    };
    console.log(obj);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar novo gasto</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Quanto você gastou"
          keyboardType={"numeric"}
          value={props.cost || ""}
          onChangeText={(value) => props.setCost(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Observações (opcional)"
          value={props.obs || ""}
          onChangeText={(value) => props.setObs(value)}
        />
        <Datepicker
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <Text>{props.cost}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(250, 65%, 88%)",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: "90%",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "stretch",
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: "hsl(250, 36%, 57%)",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
