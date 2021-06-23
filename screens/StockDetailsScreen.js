import React from "react";
import { Text, View, StyleSheet } from "react-native";

const StockDetailsScreen = ({ navigation, route }) => {
  const { id, name } = route.params;

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StockDetailsScreen;
