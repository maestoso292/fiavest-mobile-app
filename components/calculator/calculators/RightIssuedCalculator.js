import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import CalculatorCollapsible from "../CalculatorCollapsible";
import CalculatorInput from "../CalculatorInput";
import CalculatorOutput from "../CalculatorOutput";
import ButtonCon from "../CalculatorButton";
import Divider from "../../Divider";
import TextButton from "../../base/TextButton";
import MyButton from "../../MyButton";

const RightIssuedCalculator = (props) => {
  const [isCalculate, setIsCalculate] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

  const [NewShare, setNewShare] = useState();
  const [OldShare, setOldShare] = useState();
  const [IssuePrice, setIssuePrice] = useState();
  const [MarketPrice, setMarketPrice] = useState();

  const [ExRightsPrice, setExRightsPrice] = useState(0);

  const calculateHandler = () => {
    setIsEdit(false);

    const parseRightsPrice =
      (parseFloat(NewShare) * parseFloat(IssuePrice) +
        parseFloat(OldShare) * parseFloat(MarketPrice)) /
      (parseFloat(NewShare) + parseFloat(OldShare));

    if (parseRightsPrice > 0) {
      setExRightsPrice(parseRightsPrice.toFixed(2));
    } else {
      setExRightsPrice("0.00");
    }

    setIsCalculate(!isCalculate);
  };

  const recalculateHandler = () => {
    setIsEdit(true);
    setIsCalculate(true);

    setExRightsPrice(0);
  };

  const clearHandler = () => {
    setNewShare();
    setOldShare();
    setIssuePrice();
    setMarketPrice();
  };

  return (
    <CalculatorCollapsible {...props} title="Right Issued Calculator">
      <CalculatorInput
        title="Old Shares"
        value={OldShare}
        onChangeText={(value) => setOldShare(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Market Price"
        value={MarketPrice}
        onChangeText={(value) => setMarketPrice(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="New Shares"
        value={NewShare}
        onChangeText={(value) => setNewShare(value)}
        editable={isEdit}
      />
      <CalculatorInput
        title="Issue Price"
        value={IssuePrice}
        onChangeText={(value) => setIssuePrice(value)}
        editable={isEdit}
      />
      <Divider />
      {isCalculate ? (
        <ButtonCon onCalculate={calculateHandler} onClear={clearHandler} />
      ) : (
        <View>
          <CalculatorOutput
            title="Theoretical Ex-rights Price"
            value={ExRightsPrice}
          />
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
});

export default RightIssuedCalculator;
