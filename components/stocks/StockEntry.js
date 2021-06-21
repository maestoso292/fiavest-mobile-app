import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const StockEntry = (props) => {
  return (
    <TouchableOpacity>
      <View style={styles.entry}>
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entry: {
    width: "100%",
    height: 200,
    marginVertical: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default StockEntry;
