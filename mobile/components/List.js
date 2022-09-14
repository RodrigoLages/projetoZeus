import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Item from "./Item";

export default function List() {
  const [items, setItems] = React.useState([
    {_id: 0, cost: 12, obs: "", date: '20/04/1945'},
    {_id: 1, cost: 2, obs: "barataum", date: '25/04/2000'},
    {_id: 2, cost: 14, obs: "meh", date: '25/04/2020'},
    {_id: 3, cost: 7, obs: "", date: '25/04/2022'},
    {_id: 4, cost: 35, obs: "ai meu rim", date: '25/12/2020'},
    {_id: 5, cost: 20, obs: "", date: '01/01/1900'},
  ])

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Lista de Gastos</Text>
        <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.itemsContainer}>
            { items.map(item => {
                return <Item key={item._id} id={item._id} cost={item.cost} obs={item.obs} date={item.date} />
            }) }
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(250, 36%, 57%)",
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20
  },
  scrollContainer: {
    flex: 1,
    width: '90%'
  },
  itemsContainer: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
});
