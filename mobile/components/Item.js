import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Database from "./Database";

export default function Item(props) {
  return (
    <View style={styles.container}>
      <View style={styles.test}>
        <Text style={styles.textItem}>
          R$ {parseFloat(props.cost).toFixed(2)}
        </Text>
        <Text style={styles.textObs}>{props.obs}</Text>
      </View>
      <View>
        <Text style={styles.textItem}>
          {new Date(props.date).toLocaleDateString()}
        </Text>
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
    shadowColor: "black",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 10,
    height: 40,
    width: 40,
    backgroundColor: "hsl(250, 57%, 33%)",
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: "black",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textItem: {
    fontSize: 20,
  },
  textObs: {
    //flexShrink: 1,
    //flexWrap: "wrap",
  },
  test: {
    justifyContent: "space-evenly",
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
});
