import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import CalculatorCollapsible from "../CalculatorCollapsible";
import CalculatorInput from "../CalculatorInput";
import CalculatorOutput from "../CalculateOutput";
import CalculatorButton from "../CalculatorButton";
import Divider from "../../Divider";
import MyButton from "../../MyButton";

const BonusIssuedCalculator = (props) => {
  const [isCalculate, setIsCalculate] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

  const [StockPrice, setStockPrice] = useState();
  const [HoldingUnits, setHoldingUnits] = useState();
  const [Bonus1, setBonus1] = useState();
  const [Bonus2, setBonus2] = useState();

  const [NewUnits, setNewUnits] = useState(0);
  const [EstimatePrice, setEstimatePrice] = useState(0);

  const calculateHandler = () => {
    setIsEdit(false);

    const HU = parseFloat(HoldingUnits);
    const SP = parseFloat(StockPrice);
    const parseNU = (HU * parseFloat(Bonus1)) / parseFloat(Bonus2) + HU;
    const parseEst = (SP * HU) / parseNU;

    isNaN(parseNU) ? setNewUnits("0") : setNewUnits(parseNU.toFixed());
    isNaN(parseEst)
      ? setEstimatePrice("0.00")
      : setEstimatePrice(parseEst.toFixed(2));

    setIsCalculate(!isCalculate);
  };

  const recalculateHandler = () => {
    setIsEdit(true);
    setIsCalculate(true);

    setNewUnits(0);
    setEstimatePrice(0);
  };

  const clearHandler = () => {
    setStockPrice();
    setHoldingUnits();
    setBonus1();
    setBonus2();
  };

  return (
    <CalculatorCollapsible {...props} title="Bonus Issued Calculator">
      <CalculatorInput
        title="Stock Price"
        value={StockPrice}
        onChangeText={(value) => setStockPrice(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Holding Units"
        value={HoldingUnits}
        onChangeText={(value) => setHoldingUnits(value)}
        editable={isEdit}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Bonus Ratio</Text>
        <View style={styles.forCon}>
          <TextInput
            style={styles.input}
            textAlign={"center"}
            keyboardType="numeric"
            value={Bonus1}
            onChangeText={(value) => setBonus1(value)}
            editable={isEdit}
          />
          <Text>FOR</Text>
          <TextInput
            style={styles.input}
            textAlign={"center"}
            keyboardType="numeric"
            value={Bonus2}
            onChangeText={(value) => setBonus2(value)}
            editable={isEdit}
          />
        </View>
      </View>
      <Divider />
      {isCalculate ? (
        <CalculatorButton onCalculate={calculateHandler} onClear={clearHandler} />
      ) : (
        <View>
          <CalculatorOutput title="New Units" value={NewUnits} />
          <CalculatorOutput title="Estimate Price" value={EstimatePrice} />
          <View style={styles.buttonCon}>
            <MyButton onPress={RecalculateHandler} extraStyle={{ width: 120 }}>
              Recalculate
            </MyButton>
          </View>
        </View>
      )}
    </CalculatorCollapsible>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    width: "35%",
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",
  },
  buttonCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  forCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 130,
  },
  title: {
    color: "white",
    fontSize: 14,
  },
});

export default BonusIssuedCalculator;
