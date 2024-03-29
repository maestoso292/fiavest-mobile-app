import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import CalculatorCollapsible from "../CalculatorCollapsible";
import CalculatorInput from "../CalculatorInput";
import CalculatorOutput from "../CalculatorOutput";
import ButtonCon from "../CalculatorButton";
import Divider from "../../Divider";
import TextButton from "../../base/TextButton";
import MyButton from "../../MyButton";

const ProfitLossCalculator = (props) => {
  const [isCalculate, setIsCalculate] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

  const [PricePurchased, setPricePurchased] = useState();
  const [PriceSold, setPriceSold] = useState();
  const [ShareHeld, setShareHeld] = useState();
  const [BrokeragePercent, setBrokeragePercent] = useState();
  const [MinBrokerage, setMinBrokerage] = useState();

  const [totalGrossProfit, setTotalGrossProfit] = useState(0);
  const [LBASBrokerage, setLBASBrokerage] = useState(0);
  const [clearingFee, setClearingFee] = useState(0);
  const [stampDuties, setStampDuties] = useState(0);
  const [netProfit, setNetProfit] = useState(0);

  const calculateHandler = () => {
    setIsEdit(false);

    const MarketValue = parseFloat(PricePurchased) * parseFloat(ShareHeld);
    const totalSold = parseFloat(PriceSold) * parseFloat(ShareHeld);
    const Market = (MarketValue * parseFloat(BrokeragePercent)) / 100;
    const Sold = (totalSold * parseFloat(BrokeragePercent)) / 100;
    const parseMinBrokerage = parseFloat(MinBrokerage);
    const totalGross = totalSold - MarketValue;
    const clearing = (MarketValue * 0.03) / 100 + (totalSold * 0.03) / 100;
    const stampDuty = (MarketValue * 0.1) / 100 + (totalSold * 0.1) / 100;
    const situation1 = Market + Sold;
    const situation2 = Market + parseMinBrokerage;
    const situation3 = parseMinBrokerage + Sold;
    const situation4 = parseMinBrokerage + parseMinBrokerage;

    if (Market > parseMinBrokerage && Sold > parseMinBrokerage) {
      const NetProfit = totalGross - situation1 - clearing - stampDuty;

      setLBASBrokerage(situation1.toFixed(2));
      setTotalGrossProfit(totalGross.toFixed(2));
      setClearingFee(clearing.toFixed(2));
      setStampDuties(stampDuty.toFixed(2));
      setNetProfit(NetProfit.toFixed(2));
    } else if (Market > parseMinBrokerage && Sold < parseMinBrokerage) {
      const NetProfit = totalGross - situation2 - clearing - stampDuty;

      setLBASBrokerage(situation2.toFixed(2));
      setTotalGrossProfit(totalGross.toFixed(2));
      setClearingFee(clearing.toFixed(2));
      setStampDuties(stampDuty.toFixed(2));
      setNetProfit(NetProfit.toFixed(2));
    } else if (Market < parseMinBrokerage && Sold > parseMinBrokerage) {
      const NetProfit = totalGross - situation3 - clearing - stampDuty;

      setLBASBrokerage(situation3.toFixed(2));
      setTotalGrossProfit(totalGross.toFixed(2));
      setClearingFee(clearing.toFixed(2));
      setStampDuties(stampDuty.toFixed(2));
      setNetProfit(NetProfit.toFixed(2));
    } else if (Market < parseMinBrokerage && Sold < parseMinBrokerage) {
      const NetProfit = totalGross - situation4 - clearing - stampDuty;

      setLBASBrokerage(situation4.toFixed(2));
      setTotalGrossProfit(totalGross.toFixed(2));
      setClearingFee(clearing.toFixed(2));
      setStampDuties(stampDuty.toFixed(2));
      setNetProfit(NetProfit.toFixed(2));
    }

    setIsCalculate(!isCalculate);
  };

  const recalculateHandler = () => {
    setIsCalculate(true);
    setIsEdit(true);

    setNetProfit(0);
    setTotalGrossProfit(0);
    setLBASBrokerage(0);
    setClearingFee(0);
    setStampDuties(0);
  };

  const clearHandler = () => {
    setMinBrokerage();
    setBrokeragePercent();
    setPricePurchased();
    setPriceSold();
    setShareHeld();
  };

  return (
    <CalculatorCollapsible {...props} title="Profit and Loss Calculator">
      <CalculatorInput
        title="Price Purchased (RM)"
        value={PricePurchased}
        onChangeText={(value) => setPricePurchased(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Share Held (Units)"
        value={ShareHeld}
        onChangeText={(value) => setShareHeld(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Price Sold (RM)"
        value={PriceSold}
        onChangeText={(value) => setPriceSold(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Brokerage (%)"
        value={BrokeragePercent}
        onChangeText={(value) => setBrokeragePercent(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Min Brokerage (RM)"
        value={MinBrokerage}
        onChangeText={(value) => setMinBrokerage(value)}
        editable={isEdit}
      />
      <Divider />
      {isCalculate ? (
        <ButtonCon onCalculate={calculateHandler} onClear={clearHandler} />
      ) : (
        <View>
          <CalculatorOutput
            title="Total Gross Profit/Loss on Shares (RM)"
            value={totalGrossProfit}
          />
          <CalculatorOutput
            title="Less Buying and Selling Brokerage (RM)"
            value={LBASBrokerage}
          />
          <CalculatorOutput title="Clearing Fees (RM)" value={clearingFee} />
          <CalculatorOutput title="Stamp Duties (RM)" value={stampDuties} />
          <CalculatorOutput title="Net Profit/Loss (RM)" value={netProfit} />
          <View style={styles.bottomContainer}>
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
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfitLossCalculator;
