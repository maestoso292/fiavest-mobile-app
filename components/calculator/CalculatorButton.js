import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyButton from '../MyButton';

const CalculatorButton = props => {
    return (
        <View style={styles.rootContainer}>
            <MyButton onPress={props.onCalculate}>Calculate</MyButton>
            <MyButton onPress={props.onClear}>Reset</MyButton>
        </View>
    )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CalculatorButton;
