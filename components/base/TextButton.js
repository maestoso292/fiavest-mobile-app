import React from "react";
import { Text, StyleSheet } from "react-native";
import { BORDER_PRIMARY, BUTTON_BG_LIGHT } from "../../constants/colors";
import TouchableCustom from "./TouchableCustom";

const TextButton = (props) => {
  return (
    <TouchableCustom
      onPress={props.onPress}
      useAndroid
      type="opacity"
      containerStyle={{ ...styles.container, ...props.containerStyle }}
      contentStyle={{ ...styles.content, ...props.contentStyle }}
      touchableStyle={{ ...styles.touchable, ...props.touchableStyle }}
    >
      <Text style={{ ...styles.text, ...props.textStyle }}>{props.text}</Text>
    </TouchableCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BUTTON_BG_LIGHT,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_PRIMARY,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    flex: 1,
  },
  touchable: {},
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TextButton;
