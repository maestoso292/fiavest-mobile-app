import React, { useCallback, useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import ViewPopup from "../base/ViewPopup";
import TouchableCustom from "../base/TouchableCustom";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../../constants/colors";
import { useHeaderHeight } from "@react-navigation/stack";

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;

const RESET = "RESET";
const SUBMIT = "SUBMIT";

const initialState = {
  broker: "Broker 1",
  lot: null,
  total: null,
  payment: "Payment 1",
};

const buyReducer = (state, action) => {
  switch (action.type) {
    case SUBMIT:
      const updated = {
        ...state,
        [action.id]: action.value,
      };
      return updated;
    case RESET:
      return initialState;
  }
};

const CartPopup = (props) => {
  const [buyState, dispatchBuyState] = useReducer(buyReducer, initialState);
  const [isValid, setIsValid] = useState();

  const inputChangeHandler = useCallback(
    (type, id, value) => {
      console.log(`${type} : ${id} : ${value}`);
      dispatchBuyState({ type: type, id: id, value: value });
    },
    [dispatchBuyState]
  );

  const submitHandler = () => {
    if (Object.values(buyState).every((item) => item)) {
      setIsValid(true);
      const { broker, lot, total, payment } = buyState;
      dispatchBuyState({ type: RESET });
      props.onSubmit(broker, lot, total, payment);
    } else {
      setIsValid(false);
      // TODO Display a useful error to user
      console.log("Fields can't be empty");
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        ...styles.popupContainer,
        top: -useHeaderHeight(),
        ...props.containerStyle,
      }}
      pointerEvents={props.visible ? "auto" : "none"}
      // TODO Double check for correct behaviour on iOS devices
      behavior={Platform.select({ ios: "height", android: null })}
    >
      <ViewPopup style={{ ...styles.popup, ...props.popupStyle }}>
        <View style={styles.row}>
          <Text>Broker:</Text>
          <Picker
            style={styles.picker}
            selectedValue={buyState.broker}
            onValueChange={(value) =>
              inputChangeHandler(SUBMIT, "broker", value)
            }
          >
            <Picker.Item label="Broker 1" value="Broker 1" />
            <Picker.Item label="Broker 2" value="Broker 2" />
            <Picker.Item label="Broker 3" value="Broker 3" />
            <Picker.Item label="Broker 4" value="Broker 4" />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text>Lot (x100):</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            value={buyState.lot}
            onChangeText={(text) => inputChangeHandler(SUBMIT, "lot", text)}
          />
        </View>
        <View style={styles.row}>
          <Text>Total (MYR):</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={buyState.total}
            onChangeText={(text) => inputChangeHandler(SUBMIT, "total", text)}
          />
        </View>
        <View style={styles.row}>
          <Text>Payment:</Text>
          <Picker
            style={styles.picker}
            selectedValue={buyState.payment}
            onValueChange={(value) =>
              inputChangeHandler(SUBMIT, "payment", value)
            }
          >
            <Picker.Item label="Payment 1" value="Payment 1" />
            <Picker.Item label="Payment 2" value="Payment 2" />
            <Picker.Item label="Payment 3" value="Payment 3" />
            <Picker.Item label="Payment 4" value="Payment 4" />
          </Picker>
        </View>

        {isValid === false && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Fields cannot be empty</Text>
          </View>
        )}

        <View style={styles.row}>
          <TouchableCustom
            type="highlight"
            useAndroid
            containerStyle={styles.buttonContainer}
            contentStyle={styles.buttonContent}
            onPress={submitHandler}
          >
            <Text style={{ color: "blue" }}>Buy</Text>
          </TouchableCustom>
        </View>
      </ViewPopup>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    borderRadius: 30,
    backgroundColor: POPUP_LIGHT,
    overflow: "hidden",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    textAlign: "center",
    marginLeft: 10,
  },
  picker: {
    flex: 1,
    textAlign: "center",
    height: "100%",
    marginLeft: 10,
  },
  buttonContainer: {
    borderRadius: 5,
    width: "30%",
    marginHorizontal: 50,
    borderColor: BORDER_PRIMARY,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonContent: {
    padding: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2
  },
  errorText: {
    color: "red",
    fontStyle: "italic",
  },
});

export default CartPopup;
