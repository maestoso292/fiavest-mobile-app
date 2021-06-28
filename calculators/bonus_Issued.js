import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import TypeCalculator from '../components/CalculatorType';
import Button2 from '../components/Button2';
import InputCon from '../components/CalculatorInput';
import OutputCon from '../components/CalculateOutput';
import ButtonCon from '../components/CalculatorButton';

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

        setNewUnits(parseNU.toFixed())
        setEstimatePrice(parseEst.toFixed(2))

        setIsCalculate(!isCalculate)
    }

    const ReCalculateHandler = () => {
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
                <Text>Bonus Ratio</Text>
                <View style={styles.forCon}>
                    <TextInput
                    style={styles.input}
                    textAlign={'center'}
                    keyboardType="numeric" 
                    value={Bonus1} 
                    onChangeText={(value) => setBonus1(value)}
                    editable={isEdit}
                    />
                    <Text>FOR</Text>
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
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'black', marginBottom: 10}}/>
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
                    <Button2 onPress={RecalculateHandler} extraStyle={{width: 120}}>Recalculate</Button2>
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
    },
    buttonCon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 130,
    }
});

export default BonusIssuedCalculator;