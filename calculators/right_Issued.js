import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import TypeCalculator from '../components/CalculatorType';
import Button2 from '../components/Button2';
import InputCon from '../components/CalculatorInput';
import OutputCon from '../components/CalculateOutput';
import ButtonCon from '../components/CalculatorButton';

const RightIssuedCalculator = (props) => {

    const [isCalculate, setIsCalculate] = useState(true)
    const [isEdit, setIsEdit] = useState(true)

    const [NewShare, setNewShare] = useState()
    const [OldShare, setOldShare] = useState()
    const [IssuePrice, setIssuePrice] = useState()
    const [MarketPrice, setMarketPrice] = useState()

    const [ExRightsPrice, setExRightsPrice] = useState(0)

    const CalculateHandler = () => {

        setIsEdit(false)

        const parseRightsPrice = (
            ((parseFloat(NewShare) * parseFloat(IssuePrice)) + ((parseFloat(OldShare)) * parseFloat(MarketPrice))) /
            (parseFloat(NewShare) + parseFloat(OldShare))
        )

        if (parseRightsPrice > 0) {
            setExRightsPrice(parseRightsPrice.toFixed(2))
        } else {
            setExRightsPrice("0.00")
        }

        setIsCalculate(!isCalculate)
    }

    const RecalculateHandler = () => {

        setIsEdit(true)
        setIsCalculate(true)

        setExRightsPrice(0)

    }

    const ClearHandler = () => {
        setNewShare()
        setOldShare()
        setIssuePrice()
        setMarketPrice()
    }

    return (
        <TypeCalculator
        {...props}
        title="Right Issued Calculator"
        >
            <InputCon 
            title="Old Shares"
            value={OldShare}
            onChangeText={(value) => setOldShare(value)}
            editable={isEdit}
            />
            <InputCon 
            title="Market Price"
            value={MarketPrice}
            onChangeText={(value) => setMarketPrice(value)}
            editable={isEdit}
            />
            <InputCon 
            title="New Shares"
            value={NewShare}
            onChangeText={(value) => setNewShare(value)}
            editable={isEdit}
            />
            <InputCon 
            title="Issue Price"
            value={IssuePrice}
            onChangeText={(value) => setIssuePrice(value)}
            editable={isEdit}
            />
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'black', marginBottom: 10}}/>
            {isCalculate ? (
                <ButtonCon 
                onCalculate={CalculateHandler}
                onClear={ClearHandler}
                />
            ) : (
                <View>
                <OutputCon 
                title="Theoretical Ex-rights Price"
                value={ExRightsPrice}
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
        width: 130,
        borderBottomWidth: 1,
    },
    buttonCon: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default RightIssuedCalculator;