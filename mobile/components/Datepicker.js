import React from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Datepicker(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const formatDate = (dateString) => {
    const arr = new Date(dateString).toLocaleDateString().split("/");
    return `${arr[1]}/${arr[0]}/${arr[2]}`;
  };

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    hideDatePicker();
    props.setSelectedDate(date.toString());
  };

  return (
    <View>
      <View style={styles.input}>
        <TextInput value={formatDate(props.selectedDate)} />
        <Button title="Escolher Data" onPress={showDatePicker} />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(props.selectedDate)}
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
});
