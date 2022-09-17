import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Datepicker from "./Datepicker";
import Database from "./Database";

export default function Form({ route, navigation }) {
  const _id = route.params ? route.params._id : undefined;
  const [editing, setEditing] = React.useState(false);
  const [cost, setCost] = React.useState("");
  const [obs, setObs] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date().toString());

  console.log(editing);
  React.useEffect(() => {
    if (!route.params) return;
    setEditing(true);
    setCost(parseFloat(route.params.cost).toFixed(2));
    setObs(route.params.obs);
    setSelectedDate(new Date(route.params.date).toString());
  }, [route.params]);

  const handleSubmit = async () => {
    if (editing) {
      const purchase = {
        _id,
        cost,
        obs,
        date: selectedDate,
      };

      Database.editItem(purchase).then((res) =>
        navigation.navigate("List", purchase)
      );
    } else {
      const purchase = {
        cost,
        obs,
        date: selectedDate,
      };

      Database.saveItem(purchase).then((res) =>
        navigation.navigate("List", purchase)
      );
    }

    setEditing(false);
    setCost("");
    setObs("");
    setSelectedDate(new Date().toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar novo gasto</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Quanto você gastou"
          keyboardType={"numeric"}
          value={cost || ""}
          onChangeText={(value) => setCost(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Observações (opcional)"
          value={obs || ""}
          onChangeText={(value) => setObs(value)}
        />
        <Datepicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(250, 36%, 57%)",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    color: "#fff",
  },
  inputContainer: {
    marginTop: 30,
    width: "90%",
    padding: 20,
    paddingBottom: 50,
    borderRadius: 10,

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
    backgroundColor: "hsl(250, 57%, 33%)",
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
