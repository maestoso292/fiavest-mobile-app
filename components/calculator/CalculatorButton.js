import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button2 from '../Button2';

const ButtonCon = props => {
    return (
        <View style={styles.buttonCon}>
            <Button2 onPress={props.onCalculate}>Calculate</Button2>
            <Button2 onPress={props.onClear}>Reset</Button2>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonCon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default ButtonCon;