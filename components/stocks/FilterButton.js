import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FilterButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.3} onPress={props.onPress}>
      <View style={{ ...styles.buttonContainer, ...props.style }}>
        <Ionicons name="options-outline" size={30} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingRight: 14,
  },
});
export default FilterButton;
