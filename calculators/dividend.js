import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import TypeCalculator from '../components/calculator/CalculatorType';
import OutputCon from '../components/calculator/CalculateOutput';
import InputCon from '../components/calculator/CalculatorInput';
import ButtonCon from '../components/calculator/CalculatorButton';
import Divider from '../components/Divider';
import MyButton from '../components/MyButton';

const DividendCalculator = (props) => {

    const [isCalculate, setIsCalculate] = useState(true)
    const [isEdit, setIsEdit] = useState(true)
    const [isPick, setIsPick] = useState(true)

    const [BuyPrice, setBuyPrice] = useState()
    const [CurrentStockPrice, setCurrentStockPrice] = useState()
    const [HoldingUnits, setHoldingUnits] = useState()
    const [DividendPerShare, setDividendPerShare] = useState()
    const [type, setType] = useState('cent')
    const [incomeTax, setIncomeTax] = useState()

    const [GrossDividend, setGrossDividend] = useState(0)
    const [Tax, setTax] = useState(0)
    const [NetDividend, setNetDividend] = useState(0)
    const [EstimatePrice, setEstimatePrice] = useState(0)
    const [DividendYield, setDividendYield] = useState(0)
    const [CapitalGain, setCapitalGain] = useState(0)
    const [TotalGain, setTotalGain] = useState(0)
    const [ROI, setROI] = useState(0)

    const CalculateHandler = () => {

        setIsEdit(false)
        setIsPick(false)
        
        const parseEst = ((parseFloat(CurrentStockPrice) - (parseFloat(DividendPerShare) / 100)))
        
        const parseBuyAmount = ((parseFloat(BuyPrice)) * parseFloat(HoldingUnits))

        if (type === 'cent') {
            const parseGD = (parseFloat(HoldingUnits)) * (parseFloat(DividendPerShare) / 100)
            const parseTax = (parseGD * (incomeTax / 100))
            const parseND = (parseGD - parseTax)
            const parseCG = ((parseEst - (parseFloat(BuyPrice))) * (parseFloat(HoldingUnits)))
            const parseTG = (parseCG + parseND)
            const parseROI = ((parseTG/parseBuyAmount) * 100)
            const parseYield = (((parseGD) / ((parseFloat(CurrentStockPrice)) * (parseFloat(HoldingUnits)))) * 100)
            
            isNaN(parseGD) ? setGrossDividend("0.00") : setGrossDividend(parseGD.toFixed(2))
            isNaN(parseTax) ? setTax("0.00") : setTax(parseTax.toFixed(2))
            isNaN(parseND) ? setNetDividend("0.00") : setNetDividend(parseND.toFixed(2))
            isNaN(parseCG) ? setCapitalGain("0.00") : setCapitalGain(parseCG.toFixed(2))
            isNaN(parseTG) ? setTotalGain("0.00") : setTotalGain(parseTG.toFixed(2))
            isNaN(parseROI) ? setROI("0.000") : setROI(parseROI.toFixed(3))
            isNaN(parseYield) ? setDividendYield(0) : setDividendYield(parseYield.toFixed())
        } else if (type === 'percent') {
            const parseGD = ((parseFloat(CurrentStockPrice) * (parseFloat(HoldingUnits))) * (parseFloat(DividendPerShare) / 100))
            const parseTax = (parseGD * (incomeTax / 100))
            const parseND = (parseGD - parseTax)
            const parseCG = ((parseEst - (parseFloat(BuyPrice))) * (parseFloat(HoldingUnits)))
            const parseTG = (parseCG + parseND)
            const parseROI = ((parseTG/parseBuyAmount) * 100)
            const parseYield = ((parseGD) / ((parseFloat(CurrentStockPrice)) * (parseFloat(HoldingUnits))))
            
            isNaN(parseGD) ? setGrossDividend("0.00") : setGrossDividend(parseGD.toFixed(2))
            isNaN(parseTax) ? setTax("0.00") : setTax(parseTax.toFixed(2))
            isNaN(parseND) ? setNetDividend("0.00") : setNetDividend(parseND.toFixed(2))
            isNaN(parseCG) ? setCapitalGain("0.00") : setCapitalGain(parseCG.toFixed(2))
            isNaN(parseTG) ? setTotalGain("0.00") : setTotalGain(parseTG.toFixed(2))
            isNaN(parseROI) === true ? setROI("0.000") : setROI(parseROI.toFixed(3))
            isNaN(parseYield) === true ? setDividendYield(0) : setDividendYield(parseYield.toFixed())
        }

        setEstimatePrice(parseEst.toFixed(3))

        setIsCalculate(!isCalculate)
    }

    const RecalculateHandler = () => {
        setIsEdit(true)
        setIsCalculate(true)
        setIsPick(true)

        setType('cent')
        setGrossDividend(0)
        setTax(0)
        setNetDividend(0)
        setDividendYield(0)
        setCapitalGain(0)
        setTotalGain(0)
        setROI(0)
    }

    const ClearHandler = () => {

        setBuyPrice()
        setCurrentStockPrice()
        setHoldingUnits()
        setDividendPerShare()
        setIncomeTax()

    }

    return (
        <TypeCalculator
        {...props}
        title="Dividend Calculator"
        >
            <InputCon 
            title="Buy in Price"
            value={BuyPrice}
            onChangeText={(value) => setBuyPrice(value)}
            editable={isEdit}
            />
            <InputCon 
            title="Current Stock Price"
            value={CurrentStockPrice}
            onChangeText={(value) => setCurrentStockPrice(value)}
            editable={isEdit}
            />
            <InputCon 
            title="Holding Units"
            value={HoldingUnits}
            onChangeText={(value) => setHoldingUnits(value)}
            editable={isEdit}
            />
            <InputCon 
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
                    style={{width: 130, height: 30}}
                    enabled={isPick}
                    onValueChange={(value) => setType(value)}
                    >   
                        <Picker.Item label="Cents (¢)" value="cent" />
                        <Picker.Item label="Percent (%)" value="percent" />
                    </Picker>
                </View>
            </View>
            <InputCon 
            title="Income Tax"
            value={incomeTax}
            onChangeText={(value) => setIncomeTax(value)}
            editable={isEdit}
            />
            <Divider />
            {isCalculate ? (
                <ButtonCon 
                onCalculate={CalculateHandler}
                onClear={ClearHandler}
                />
            ) : (
                <View>
                <OutputCon 
                title="Gross Dividend"
                value={GrossDividend}
                />
                <OutputCon 
                title="Tax"
                value={Tax}
                />
                <OutputCon 
                title="Net Dividend"
                value={NetDividend}
                />
                <OutputCon 
                title="Estimate price after ex-date"
                value={EstimatePrice}
                />
                <OutputCon 
                title="Dividend Yield (%)"
                value={DividendYield}
                />
                <OutputCon 
                title="Capital Gain/Loss (RM)"
                value={CapitalGain}
                />
                <OutputCon 
                title="Total Gain/Loss (RM)"
                value={TotalGain}
                />
                <OutputCon 
                title="ROI (%)"
                value={ROI}
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
    buttonCon: {
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});

export default DividendCalculator;