import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import TypeCalculator from '../components/CalculatorType';
import Button2 from '../components/Button2';

const RightIssuedCalculator = (props) => {

    const [totalAmount, setTotalAmount] = useState(0.00)
    const [isCalculate, setIsCalculate] = useState(true)
    const [isEdit, setIsEdit] = useState(true)
    const [value1, setValue1] = useState()
    const [value2, setValue2] = useState()

    const CalculateHandler = () => {
        setIsEdit(false)
        const parseValue1 = parseFloat(value1)
        const parseValue2 = parseFloat(value2)
        const total = parseValue1 + parseValue2
        if (isNaN(total)) {
            setTotalAmount(0.00)
        } else {
            setTotalAmount(total)
        }
        setIsCalculate(!isCalculate)
    }

    const ReCalculateHandler = () => {
        setIsEdit(true)
        setTotalAmount(0.00)
        setIsCalculate(true)
        setValue1(null)
        setValue2(null)
    }

    return (
        <TypeCalculator
        {...props}
        title="Right Issued Calculator"
        >
            <View style={styles.container}>
                <Text>First number : </Text>
                <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                value={value1} 
                onChangeText={(value) => setValue1(value)}
                editable={isEdit}
                />
            </View>
            <View style={styles.container}>
                <Text>Second number : </Text>
                <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                value={value2} 
                onChangeText={(value) => setValue2(value)}
                editable={isEdit}
                />
            </View>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'black', marginBottom: 10}}/>
            {isCalculate ? (
                <View style={styles.buttonCon}>
                    <Button2 onPress={CalculateHandler} >Calculate</Button2>
                </View>
            ) : (
                <View>
                <View style={styles.container}>
                    <Text>Total : </Text>
                    <Text style={{fontWeight: 'bold'}}>{totalAmount}</Text>
                </View>
                <View style={styles.buttonCon}>
                    <Button2 onPress={ReCalculateHandler} extraStyle={{width: 120}}>Recalculate</Button2>
                </View>
            </View>
            )}
            
        </TypeCalculator>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        width: 130,
        borderBottomWidth: 1,
    },
    buttonCon: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default RightIssuedCalculator;