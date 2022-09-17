import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import Item from "./Item";
import Database from "./Database";

export default function List({ route, navigation }) {
  const [items, setItems] = React.useState([]);
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  );

  const fullMonth = new Map();
  fullMonth.set(0, "Janeiro");
  fullMonth.set(1, "Fevereiro");
  fullMonth.set(2, "Março");
  fullMonth.set(3, "Abril");
  fullMonth.set(4, "Maio");
  fullMonth.set(5, "Junho");
  fullMonth.set(6, "Julho");
  fullMonth.set(7, "Agosto");
  fullMonth.set(8, "Setembro");
  fullMonth.set(9, "Outubro");
  fullMonth.set(10, "Novembro");
  fullMonth.set(11, "Dezembro");

  React.useEffect(() => {
    Database.getItems().then((items) =>
      setItems(
        items.sort(
          (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
        )
      )
    );
  }, [route]);

  const handleLeftArrow = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else setSelectedMonth(selectedMonth - 1);
  };

  const handleRightArrow = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else setSelectedMonth(selectedMonth + 1);
  };

  const getMonthItems = () => {
    return items
      .filter((item) => new Date(item.date).getFullYear() === selectedYear)
      .filter((item) => new Date(item.date).getMonth() === selectedMonth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="caretleft"
          color="white"
          size={30}
          onPress={handleLeftArrow}
        />
        <Text style={styles.title}>
          Gastos de {fullMonth.get(selectedMonth)}
        </Text>
        <Icon
          name="caretright"
          color="white"
          size={30}
          onPress={handleRightArrow}
        />
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.itemsContainer}
      >
        {getMonthItems().length === 0 && <Text>Não há gastos neste mês</Text>}
        {getMonthItems().map((item) => {
          return (
            <Item
              key={item._id}
              _id={item._id}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    width: "90%",
  },
  itemsContainer: {
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
});
