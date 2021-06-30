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

const AlertDisablePopup = (props) => {
  const cancelHandler = () => {
    props.onCancel();
  };

  const submitHandler = () => {
    props.onSubmit();
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
        <View
          style={{
            ...styles.inputContainer,
            width: "65%",
            flexDirection: "column",
            alignItems: "center",
            paddingHorizontal: 40,
          }}
        >
          <Text style={styles.inputText}>
            Are you sure you want to turn off the alert of
          </Text>
          <Text style={styles.inputText}>
            <Text style={{ fontWeight: "bold" }}>
              {props.stockId} {props.stockName}
            </Text>
            ?
          </Text>
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
            onPress={submitHandler}
          >
            <Text style={{ color: "blue" }}>Confirm</Text>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    padding: 10,
  },
  inputText: {
    textAlign: "center",
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

export default AlertDisablePopup;
