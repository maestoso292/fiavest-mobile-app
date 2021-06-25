import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ViewPopup from "../base/ViewPopup";
import TouchableCustom from "../base/TouchableCustom";
import { POPUP_LIGHT } from "../../constants/colors";

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;

const AlertPopup = (props) => {
  return (
    <View
      style={{ ...styles.popupContainer, ...props.containerStyle }}
      pointerEvents={props.visible ? "auto" : "none"}
    >
      <ViewPopup style={{ ...styles.popup, ...props.popupStyle }}>
        <Text>Alert Test</Text>
      </ViewPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "70%",
    height: "30%",
    borderRadius: 30,
    backgroundColor: POPUP_LIGHT,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default AlertPopup;
