import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Routes } from "../constants/routes";

const StocksScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Stocks Screen</Text>
      <Button
        title="Go details"
        onPress={() => navigation.navigate(Routes.STOCK_DETAILS)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StocksScreen;
