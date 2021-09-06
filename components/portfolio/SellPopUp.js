import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import MyButton from "../MyButton";
import { Picker } from "@react-native-picker/picker";
import ViewPopup from "../base/ViewPopup";

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
          <Text style={{ fontWeight: "bold", color: "white" }}>Brokerage : </Text>
          <View style={styles.pickerBackground}>
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
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "bold", color: "white"  }}>Lot (x100) : </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "bold", color: "white"  }}>Total (RM) : </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.pickerContainer}>
          <Text style={{ fontWeight: "bold", color: "white"  }}>Brokerage : </Text>
          <View style={styles.pickerBackground}>
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
        </View>
        <View>
          <MyButton onPress={() => {}} style={{backgroundColor: "red", marginTop: 10}}>Sell</MyButton>
          <MyButton onPress={props.onClose} style={{marginTop: 10}}>Close</MyButton>
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
    height: "50%",
    borderRadius: 30,
    backgroundColor: "#454545",
    overflow: "hidden",
    padding: 15,
  },
  temp: {
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
    height: 40,
    width: "100%",
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
    width: "60%",
    borderBottomWidth: 2,
    borderColor: "white",
    color: "white"
  },
  pickerBackground: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 5,
    width: "60%",
  }
});

export default SellPopUp;
