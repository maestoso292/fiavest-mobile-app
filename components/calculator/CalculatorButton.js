import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyButton from '../MyButton';

const ButtonCon = props => {
    return (
        <View style={styles.buttonCon}>
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
  buttonContainer: {
    width: "40%",
  },
});

export default ButtonCon;
