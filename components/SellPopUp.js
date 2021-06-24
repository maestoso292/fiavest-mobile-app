import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import ModalPopup from "./base/ModalPopup";
import Button2 from "./Button2";
import { Picker } from "@react-native-picker/picker";

const SellPopUp = (props) => {
  const [brokerage, setBrokerage] = useState();
  const [payment, setPayment] = useState();

  return (
    <ModalPopup
      {...props}
      popupStyle={styles.popupCon}
      modalStyle={styles.modal}
    >
      <View style={styles.pickerContainer}>
        <Text>Brokerage : </Text>
        <Picker
          selectedValue={brokerage}
          style={styles.picker}
          onValueChange={(itemValue) => setBrokerage(itemValue)}
        >
          <Picker.Item label="Malacca Securities Sdn Bhd" value="Malacca" />
          <Picker.Item label="Test 2" value="test 2" />
          <Picker.Item label="Test 3" value="test 3" />
          <Picker.Item label="Test 4" value="test 4" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text>Lot (x100) : </Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Total (RM) : </Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.pickerContainer}>
        <Text>Brokerage : </Text>
        <Picker
          selectedValue={payment}
          style={styles.picker}
          onValueChange={(itemValue) => setPayment(itemValue)}
        >
          <Picker.Item label="Maybank 2U" value="Maybank" />
          <Picker.Item label="Test 2" value="test 2" />
          <Picker.Item label="Test 3" value="test 3" />
          <Picker.Item label="Test 4" value="test 4" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button2 onPress={() => {}}>Sell</Button2>
        <Button2 onPress={props.onClose}>Close</Button2>
      </View>
    </ModalPopup>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "black",
    opacity: 0.8,
  },
  popupCon: {
    width: "70%",
    height: "45%",
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  pickerContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picker: {
    height: 30,
    width: 150,
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: 150,
    borderBottomWidth: 1,
  },
});

export default SellPopUp;
