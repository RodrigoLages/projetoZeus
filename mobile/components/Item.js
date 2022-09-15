import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Item(props) {
  return (
    <View style={styles.container}>
      <View style={styles.test}>
        <Text style={styles.textItem}>R$ {props.cost},00</Text>
        <Text style={styles.textObs}>{props.obs}</Text>
      </View>
      <View>
        <Text style={styles.textItem}>{props.date}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    paddingBottom: 10,
    marginTop: 10,
  },
  editButton: {
    marginLeft: 10,
    height: 40,
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: "#ccc",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 10,
    height: 40,
    width: 40,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: "#ccc",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textItem: {
    fontSize: 20,
  },
  test: {
    justifyContent: "space-evenly",
  },
});
