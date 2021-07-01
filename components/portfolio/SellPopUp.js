import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import Button2 from "../Button2";
import { Picker } from "@react-native-picker/picker";
import ViewPopup from "../base/ViewPopup";
import { POPUP_LIGHT } from "../../constants/colors";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const SellPopUp = (props) => {
  const [brokerage, setBrokerage] = useState();
  const [payment, setPayment] = useState();

  return (
    <View
      style={{ ...styles.popupContainer, ...props.containerStyle }}
      pointerEvents={props.visible ? "auto" : "none"}
    >
      <ViewPopup style={{ ...styles.popup, ...props.popupStyle }}>
        <View style={styles.pickerContainer}>
          <Text style={{ fontWeight: "bold" }}>Brokerage : </Text>
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
          <Text style={{ fontWeight: "bold" }}>Lot (x100) : </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "bold" }}>Total (RM) : </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.pickerContainer}>
          <Text style={{ fontWeight: "bold" }}>Brokerage : </Text>
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
      </ViewPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    width: "100%",
    height: DEVICE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "85%",
    height: "55%",
    borderRadius: 30,
    backgroundColor: POPUP_LIGHT,
    overflow: "hidden",
    padding: 15,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
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
