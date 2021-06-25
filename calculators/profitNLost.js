import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import TypeCalculator from '../components/CalculatorType';
import Button2 from '../components/Button2';
import InputCon from '../components/CalculatorInput';
import OutputCon from '../components/CalculateOutput';
import ButtonCon from '../components/CalculatorButton';

const ProfitAndLostCalculator = (props) => {

    const [isCalculate, setIsCalculate] = useState(true)
    const [isEdit, setIsEdit] = useState(true)

    const [PricePurchased, setPricePurchased] = useState(0)
    const [PriceSold, setPriceSold] = useState(0)
    const [ShareHeld, setShareHeld] = useState(0)
    const [BrokeragePercent, setBrokeragePercent] = useState(null)
    const [MinBrokerage, setMinBrokerage] = useState(0)


    const [totalGrossProfit, setTotalGrossProfit] = useState(0)
    const [LBASBrokerage, setLBASBrokerage] = useState(0)
    const [clearingFee, setClearingFee] = useState(0)
    const [stampDuties, setStampDuties] = useState(0)
    const [netProfit, setNetProfit] = useState(0)

    const CalculateHandler = () => {
        setIsEdit(false)
        
        const MarketValue = ((parseFloat(PricePurchased)) * (parseFloat(ShareHeld)))
        const totalSold = ((parseFloat(PriceSold)) * (parseFloat(ShareHeld)))
        const Market = ((MarketValue * (parseFloat(BrokeragePercent))) / 100)
        const Sold = ((totalSold * (parseFloat(BrokeragePercent))) / 100)
        const parseMinBrokerage = (parseFloat(MinBrokerage))
        const totalGross = (totalSold - MarketValue)
        const clearing = ((MarketValue * 0.03) / 100) + ((totalSold * 0.03) / 100)
        const stampDuty = ((MarketValue * 0.1) / 100) + ((totalSold * 0.1) / 100)
        const situation1 = (Market + Sold)
        const situation2 = (Market + (parseMinBrokerage))
        const situation3 = (parseMinBrokerage + Sold)
        const situation4 = (parseMinBrokerage + parseMinBrokerage)

        if (Market > parseMinBrokerage && Sold > parseMinBrokerage) {

            const NetProfit = (totalGross - situation1 - clearing - stampDuty)

            setLBASBrokerage (situation1.toFixed(2))
            setTotalGrossProfit(totalGross.toFixed(2))
            setClearingFee(clearing.toFixed(2))
            setStampDuties(stampDuty.toFixed(2))
            setNetProfit(NetProfit.toFixed(2))

        } else if ( Market > parseMinBrokerage && Sold < parseMinBrokerage ) {

            const NetProfit = (totalGross - situation2 - clearing - stampDuty)

            setLBASBrokerage (situation2.toFixed(2))
            setTotalGrossProfit(totalGross.toFixed(2))
            setClearingFee(clearing.toFixed(2))
            setStampDuties(stampDuty.toFixed(2))
            setNetProfit(NetProfit.toFixed(2))

        } else if ( Market < parseMinBrokerage && Sold > parseMinBrokerage ) {

            const NetProfit = (totalGross - situation3 - clearing - stampDuty)

            setLBASBrokerage (situation3.toFixed(2))
            setTotalGrossProfit(totalGross.toFixed(2))
            setClearingFee(clearing.toFixed(2))
            setStampDuties(stampDuty.toFixed(2))
            setNetProfit(NetProfit.toFixed(2))

        } else if ( Market < parseMinBrokerage && Sold < parseMinBrokerage) {

            const NetProfit = (totalGross - situation4 - clearing - stampDuty)

            setLBASBrokerage (situation4.toFixed(2))
            setTotalGrossProfit(totalGross.toFixed(2))
            setClearingFee(clearing.toFixed(2))
            setStampDuties(stampDuty.toFixed(2))
            setNetProfit(NetProfit.toFixed(2))

        }

        setIsCalculate(!isCalculate)
    }

    const RecalculateHandler = () => {
        setIsCalculate(true)
        setIsEdit(true)

        setNetProfit(0)
        setTotalGrossProfit(0)
        setLBASBrokerage(0)
        setClearingFee(0)
        setStampDuties(0)
    }

    const ClearHandler = () => {
        setMinBrokerage(0)
        setBrokeragePercent(0)
        setPricePurchased(0)
        setPriceSold(0)
        setShareHeld(0)
    }

    return (
        <TypeCalculator
        {...props}
        title="Profit and Loss Calculator"
        >
            <InputCon 
            title="Price Purchased (RM)"
            value={PricePurchased} 
            onChangeText={(value) => setPricePurchased(value)}
            editable={isEdit}
            />
            <InputCon 
            title="Share Held (Units)"
            value={ShareHeld} 
            onChangeText={(value) => setShareHeld(value)}
            editable={isEdit}
            />
            <InputCon 
            title="Price Sold (RM)"
            value={PriceSold} 
            onChangeText={(value) => setPriceSold(value)}
            editable={isEdit}
            />
            <InputCon 
            title="Brokerage (%)"
            value={BrokeragePercent}
            onChangeText={(value) => setBrokeragePercent(value)}
            editable={isEdit}
            />
            <InputCon 
            title="Min Brokerage (RM)" 
            value={MinBrokerage}
            onChangeText={(value) => setMinBrokerage(value)}
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
                title="Total Gross Profit/Loss on Shares (RM)"
                value={totalGrossProfit}
                />
                <OutputCon 
                title="Less Buying and Selling Brokerage (RM)"
                value={LBASBrokerage}
                />
                <OutputCon 
                title="Clearing Fees (RM)"
                value={clearingFee}
                />
                <OutputCon 
                title="Stamp Duties (RM)"
                value={stampDuties}
                />
                <OutputCon 
                title="Net Profit/Loss (RM)"
                value={netProfit}
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

export default ProfitAndLostCalculator;