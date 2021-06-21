import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TouchableCustom from "../base/TouchableCustom";

const FilterButton = (props) => {
  return (
    <TouchableCustom
      type="opacity"
      activeOpacity={0.3}
      onPress={props.onPress}
      contentStyle={{ ...styles.buttonContainer, ...props.style }}
    >
      <Ionicons name="options-outline" size={30} />
    </TouchableCustom>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
});
export default FilterButton;
