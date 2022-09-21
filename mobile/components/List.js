import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import Item from "./Item";
import Database from "./Database";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function List({ route, navigation }) {
  const [items, setItems] = React.useState([]);
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const fullMonth = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  React.useEffect(() => {
    Database.getItems().then((items) =>
      setItems(
        items.sort(
          (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
        )
      )
    );
  }, [route, refreshing]);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getMonthItems = () => {
    return items
      .filter((item) => new Date(item.date).getFullYear() === selectedYear)
      .filter((item) => new Date(item.date).getMonth() === selectedMonth);
  };

  const getMonthTotal = () => {
    return getMonthItems()
    .reduce((prev, curr) => prev + curr.cost, 0)
    .toFixed(2);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="leftcircle"
          color="white"
          size={30}
          onPress={handleLeftArrow}
        />
        <Text style={styles.title}>
          Gastos de {fullMonth[selectedMonth]}
        </Text>
        <Icon
          name="rightcircle"
          color="white"
          size={30}
          onPress={handleRightArrow}
        />
      </View>
      <Text style={styles.title}>R$ {getMonthTotal()}</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.itemsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
