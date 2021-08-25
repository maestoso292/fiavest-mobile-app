import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import TypeCalculator from '../components/calculator/CalculatorType';
import InputCon from '../components/calculator/CalculatorInput';
import OutputCon from '../components/calculator/CalculateOutput';
import ButtonCon from '../components/calculator/CalculatorButton';
import Divider from '../components/Divider';
import MyButton from '../components/MyButton';

const BonusIssuedCalculator = (props) => {

    const [isCalculate, setIsCalculate] = useState(true)
    const [isEdit, setIsEdit] = useState(true)

    const [StockPrice, setStockPrice] = useState()
    const [HoldingUnits, setHoldingUnits] = useState()
    const [Bonus1, setBonus1] = useState()
    const [Bonus2, setBonus2] = useState()

    const [NewUnits, setNewUnits] = useState(0)
    const [EstimatePrice, setEstimatePrice] = useState(0)

    const CalculateHandler = () => {
        setIsEdit(false)

        const HU = (parseFloat(HoldingUnits))
        const SP = (parseFloat(StockPrice))
        const parseNU = (((HU * parseFloat(Bonus1)) / parseFloat(Bonus2)) + HU)
        const parseEst = ((SP * HU) / parseNU)

        isNaN(parseNU) ? setNewUnits("0") : setNewUnits(parseNU.toFixed())
        isNaN(parseEst) ? setEstimatePrice("0.00") : setEstimatePrice(parseEst.toFixed(2))

        setIsCalculate(!isCalculate)
    }

    const RecalculateHandler = () => {
        setIsEdit(true)
        setIsCalculate(true)

        setNewUnits(0)
        setEstimatePrice(0)
    }

    const ClearHandler = () => {
        setStockPrice()
        setHoldingUnits()
        setBonus1()
        setBonus2()
    }

    return (
        <TypeCalculator
        {...props}
        title="Bonus Issued Calculator"
        >
            <InputCon 
            title="Stock Price"
            value={StockPrice}
            onChangeText={(value) => setStockPrice(value)}
            editable={isEdit}
            />
            <InputCon 
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
                    textAlign={'center'}
                    keyboardType="numeric" 
                    value={Bonus1} 
                    onChangeText={(value) => setBonus1(value)}
                    editable={isEdit}
                    />
                    <Text style={styles.title}>FOR</Text>
                    <TextInput
                    style={styles.input}
                    textAlign={'center'}
                    keyboardType="numeric" 
                    value={Bonus2} 
                    onChangeText={(value) => setBonus2(value)}
                    editable={isEdit}
                    />
                </View>
            </View>
            <Divider />
            {isCalculate ? (
                <ButtonCon 
                onCalculate={CalculateHandler}
                onClear={ClearHandler}
                />
            ) : (
                <View>
                <OutputCon 
                title="New Units"
                value={NewUnits}
                />
                <OutputCon 
                title="Estimate Price"
                value={EstimatePrice}
                />
                <View style={styles.buttonCon}>
                    <MyButton onPress={RecalculateHandler} extraStyle={{width: 120}}>Recalculate</MyButton>
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
        width: '35%',
        borderBottomWidth: 1,
        borderColor: "white",
        color: "white",
    },
    buttonCon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "50%",
    },
    title: {
        color: "white",
        fontSize: 14,
    },
});

export default BonusIssuedCalculator;