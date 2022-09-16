import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Item from "./Item";
import Database from "./Database";

export default function List({ route, navigation }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    Database.getItems().then((items) => setItems(items));
  }, [route]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Gastos</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.itemsContainer}
      >
        {items.map((item) => {
          return (
            <Item
              key={item._id}
              id={item._id}
              cost={item.cost}
              obs={item.obs}
              date={item.date}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(250, 36%, 57%)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    width: "90%",
  },
  itemsContainer: {
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
});
