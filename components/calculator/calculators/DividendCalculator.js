import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

import CalculatorCollapsible from "../CalculatorCollapsible";
import CalculatorOutput from "../CalculatorOutput";
import CalculatorInput from "../CalculatorInput";
import ButtonCon from "../CalculatorButton";
import Divider from "../../Divider";
import MyButton from "../../MyButton";

const DividendCalculator = (props) => {
  const [isCalculate, setIsCalculate] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [isPick, setIsPick] = useState(true);

  const [BuyPrice, setBuyPrice] = useState();
  const [CurrentStockPrice, setCurrentStockPrice] = useState();
  const [HoldingUnits, setHoldingUnits] = useState();
  const [DividendPerShare, setDividendPerShare] = useState();
  const [type, setType] = useState("cent");
  const [incomeTax, setIncomeTax] = useState();

  const [GrossDividend, setGrossDividend] = useState(0);
  const [Tax, setTax] = useState(0);
  const [NetDividend, setNetDividend] = useState(0);
  const [EstimatePrice, setEstimatePrice] = useState(0);
  const [DividendYield, setDividendYield] = useState(0);
  const [CapitalGain, setCapitalGain] = useState(0);
  const [TotalGain, setTotalGain] = useState(0);
  const [ROI, setROI] = useState(0);

  const calculateHandler = () => {
    setIsEdit(false);
    setIsPick(false);

    const parseEst =
      parseFloat(CurrentStockPrice) - parseFloat(DividendPerShare) / 100;

    const parseBuyAmount = parseFloat(BuyPrice) * parseFloat(HoldingUnits);

    if (type === "cent") {
      const parseGD =
        parseFloat(HoldingUnits) * (parseFloat(DividendPerShare) / 100);
      const parseTax = parseGD * (incomeTax / 100);
      const parseND = parseGD - parseTax;
      const parseCG =
        (parseEst - parseFloat(BuyPrice)) * parseFloat(HoldingUnits);
      const parseTG = parseCG + parseND;
      const parseROI = (parseTG / parseBuyAmount) * 100;
      const parseYield =
        (parseGD / (parseFloat(CurrentStockPrice) * parseFloat(HoldingUnits))) *
        100;

      isNaN(parseGD)
        ? setGrossDividend("0.00")
        : setGrossDividend(parseGD.toFixed(2));
      isNaN(parseTax) ? setTax("0.00") : setTax(parseTax.toFixed(2));
      isNaN(parseND)
        ? setNetDividend("0.00")
        : setNetDividend(parseND.toFixed(2));
      isNaN(parseCG)
        ? setCapitalGain("0.00")
        : setCapitalGain(parseCG.toFixed(2));
      isNaN(parseTG) ? setTotalGain("0.00") : setTotalGain(parseTG.toFixed(2));
      isNaN(parseROI) ? setROI("0.000") : setROI(parseROI.toFixed(3));
      isNaN(parseYield)
        ? setDividendYield(0)
        : setDividendYield(parseYield.toFixed());
    } else if (type === "percent") {
      const parseGD =
        parseFloat(CurrentStockPrice) *
        parseFloat(HoldingUnits) *
        (parseFloat(DividendPerShare) / 100);
      const parseTax = parseGD * (incomeTax / 100);
      const parseND = parseGD - parseTax;
      const parseCG =
        (parseEst - parseFloat(BuyPrice)) * parseFloat(HoldingUnits);
      const parseTG = parseCG + parseND;
      const parseROI = (parseTG / parseBuyAmount) * 100;
      const parseYield =
        parseGD / (parseFloat(CurrentStockPrice) * parseFloat(HoldingUnits));

      isNaN(parseGD)
        ? setGrossDividend("0.00")
        : setGrossDividend(parseGD.toFixed(2));
      isNaN(parseTax) ? setTax("0.00") : setTax(parseTax.toFixed(2));
      isNaN(parseND)
        ? setNetDividend("0.00")
        : setNetDividend(parseND.toFixed(2));
      isNaN(parseCG)
        ? setCapitalGain("0.00")
        : setCapitalGain(parseCG.toFixed(2));
      isNaN(parseTG) ? setTotalGain("0.00") : setTotalGain(parseTG.toFixed(2));
      isNaN(parseROI) ? setROI("0.000") : setROI(parseROI.toFixed(3));
      isNaN(parseYield)
        ? setDividendYield(0)
        : setDividendYield(parseYield.toFixed());
    }

    isNaN(parseEst) ? setEstimatePrice("0.00") : setEstimatePrice(parseEst.toFixed(3));

    setIsCalculate(!isCalculate);
  };

  const recalculateHandler = () => {
    setIsEdit(true);
    setIsCalculate(true);
    setIsPick(true);

    setType("cent");
    setGrossDividend(0);
    setTax(0);
    setNetDividend(0);
    setDividendYield(0);
    setCapitalGain(0);
    setTotalGain(0);
    setROI(0);
  };

  const clearHandler = () => {
    setBuyPrice();
    setCurrentStockPrice();
    setHoldingUnits();
    setDividendPerShare();
    setIncomeTax();
  };

  return (
    <CalculatorCollapsible {...props} title="Dividend Calculator">
      <CalculatorInput
        title="Buy in Price"
        value={BuyPrice}
        onChangeText={(value) => setBuyPrice(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Current Stock Price"
        value={CurrentStockPrice}
        onChangeText={(value) => setCurrentStockPrice(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Holding Units"
        value={HoldingUnits}
        onChangeText={(value) => setHoldingUnits(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Dividend Per Share"
        value={DividendPerShare}
        onChangeText={(value) => setDividendPerShare(value)}
        editable={isEdit}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Type</Text>
        <View style={styles.pickerBackground}>
          <Picker
            selectedValue={type}
            style={{ width: 130, height: 30 }}
            enabled={isPick}
            onValueChange={(value) => setType(value)}
          >
            <Picker.Item label="Cents (¢)" value="cent" />
            <Picker.Item label="Percent (%)" value="percent" />
          </Picker>
        </View>
      </View>
      <CalculatorInput
        title="Income Tax"
        value={incomeTax}
        onChangeText={(value) => setIncomeTax(value)}
        editable={isEdit}
      />
      <Divider />
      {isCalculate ? (
        <ButtonCon onCalculate={calculateHandler} onClear={clearHandler} />
      ) : (
        <View>
          <CalculatorOutput title="Gross Dividend" value={GrossDividend} />
          <CalculatorOutput title="Tax" value={Tax} />
          <CalculatorOutput title="Net Dividend" value={NetDividend} />
          <CalculatorOutput
            title="Estimate price after ex-date"
            value={EstimatePrice}
          />
          <CalculatorOutput title="Dividend Yield (%)" value={DividendYield} />
          <CalculatorOutput
            title="Capital Gain/Loss (RM)"
            value={CapitalGain}
          />
          <CalculatorOutput title="Total Gain/Loss (RM)" value={TotalGain} />
          <CalculatorOutput title="ROI (%)" value={ROI} />
          <View style={styles.buttonCon}>
            <MyButton onPress={recalculateHandler} extraStyle={{ width: 120 }}>
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
    width: 130,
    borderBottomWidth: 1,
  },
  buttonCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 14,
  },
  pickerBackground: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 5,
    width: "50%",
  },
});

export default DividendCalculator;
