import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TouchableCustom from "./TouchableCustom";

const HeaderButton = (props) => {
  return (
    <TouchableCustom
      type="opacity"
      activeOpacity={0.3}
      onPress={props.onPress}
      containerStyle={{ ...styles.buttonContainer, ...props.containerStyle }}
      contentStyle={{ ...styles.button, ...props.contentStyle }}
    >
      <Ionicons name={props.name} size={30} />
    </TouchableCustom>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HeaderButton;
