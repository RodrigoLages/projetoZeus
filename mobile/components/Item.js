import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Database from "./Database";

export default function Item(props) {
  const handleEdit = async () => {
    const item = await Database.getItem(props._id);
    props.navigation.navigate("Form", item);
  };

  const handleDelete = async () => {
    Alert.alert(
      "Excluir",
      "Você tem certeza que deseja excluir este item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            Database.deleteItem(props._id).then(() =>
              props.navigation.navigate("List", { _id: props._id })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const formatDate = (dateString) => {
    const arr = new Date(dateString).toLocaleDateString().split("/");
    return `${arr[1]}/${arr[0]}/${arr[2]}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.textItem}>
          R$ {parseFloat(props.cost).toFixed(2)}
        </Text>
        <Text style={styles.textObs}>
          Obs: {props.obs}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.textDate}>{formatDate(props.date)}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Icon name="trash" color="white" size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Icon name="edit" color="white" size={18} />
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
    width: 40,
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
  textDate: {
    fontSize: 15,
    fontStyle: "italic",
  },
  textItem: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textObs: {
    color: "hsl(0, 0%, 46%)",
  },
  leftContainer: {
    justifyContent: "space-around",
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
});
