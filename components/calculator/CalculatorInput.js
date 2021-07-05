import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const CalculatorInput = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
      <TextInput {...props} style={styles.input} keyboardType="numeric" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    width: 130,
    borderBottomWidth: 1,
  },
});

export default CalculatorInput;
