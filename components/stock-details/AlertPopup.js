import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import ViewPopup from "../base/ViewPopup";
import TouchableCustom from "../base/TouchableCustom";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../../constants/colors";

const AlertPopup = (props) => {
  // TODO Convert to reducer?
  const [priceTarget, setPriceTarget] = useState();
  const [volumeTarget, setVolumeTarget] = useState();

  const resetFields = () => {
    setPriceTarget(null);
    setVolumeTarget(null);
  };

  const cancelHandler = () => {
    resetFields();
    props.onCancel();
  };

  const submitHandler = (priceTarget, volumeTarget) => {
    resetFields();
    props.onSubmit(priceTarget, volumeTarget);
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
        <View style={styles.header}>
          <Text style={styles.headerContent}>REMINDER</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>When price hit:</Text>
          <Text style={{ ...styles.inputText, marginLeft: 10 }}>MYR</Text>
          <TextInput
            style={styles.input}
            value={priceTarget}
            onChangeText={setPriceTarget}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>When volume hit:</Text>
          <TextInput
            style={styles.input}
            value={volumeTarget}
            onChangeText={setVolumeTarget}
            keyboardType="number-pad"
          />
        </View>
        <View
          style={{
            ...styles.inputContainer,
            justifyContent: "space-around",
          }}
        >
          <TouchableCustom
            type="highlight"
            useAndroid
            containerStyle={styles.buttonContainer}
            contentStyle={styles.buttonContent}
            onPress={cancelHandler}
          >
            <Text style={{ color: "red" }}>Cancel</Text>
          </TouchableCustom>
          <TouchableCustom
            type="highlight"
            useAndroid
            containerStyle={styles.buttonContainer}
            contentStyle={styles.buttonContent}
            onPress={() => submitHandler(priceTarget, volumeTarget)}
          >
            <Text style={{ color: "blue" }}>Set</Text>
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
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerContent: {
    fontSize: 20,
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    padding: 10,
  },
  inputText: {
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    textAlign: "center",
    marginLeft: 5,
  },
  buttonContainer: {
    borderRadius: 5,
    width: "30%",
    borderColor: BORDER_PRIMARY,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    padding: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AlertPopup;
