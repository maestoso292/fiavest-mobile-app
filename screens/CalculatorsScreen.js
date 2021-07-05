import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import BrokerageCalculator from "../components/calculator/calculators/BrokerageCalculator";
import DividendCalculator from "../components/calculator/calculators/DividendCalculator";
import RightIssuedCalculator from "../components/calculator/calculators/RightIssuedCalculator";
import BonusIssuedCalculator from "../components/calculator/calculators/BonusIssuedCalculator";
import ProfitLossCalculator from "../components/calculator/calculators/ProfitLossCalculator";

const CalculatorScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <BrokerageCalculator />
        <DividendCalculator />
        <RightIssuedCalculator />
        <BonusIssuedCalculator />
        <ProfitLossCalculator />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default CalculatorScreen;
