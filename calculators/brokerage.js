import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

import TypeCalculator from '../components/CalculatorType';
import Button2 from '../components/Button2';
import OutputCon from '../components/CalculateOutput';

const BrokerageCalculator = (props) => {

    //Set boolean for input
    const [isIntraday, setIsIntraday] = useState(false)
    const [disable, setDisable] = useState(true)
    const [isCalculate, setIsCalculate] = useState(true)
    const [isEdit, setIsEdit] = useState(true)
    const [PercentEdit, setPercentEdit] = useState(true)

    //Important component
    const [MarketValue, setMarketValue] = useState()
    const [MinBrokerage, setMinBrokerage] = useState()
    const [PricePurchased, setPricePurchased] = useState()
    const [BrokeragePercent, setBrokeragePercent] = useState(null)
    const [PriceSold, setPriceSold] = useState()
    const [ShareHeld, setShareHeld] = useState()
    const [Brokerage, setBrokerage] = useState()

    //Result
    //LBASBrokerage = Less buying and selling brokerage
    const [totalGrossProfit, setTotalGrossProfit] = useState(0)
    const [LBASBrokerage, setLBASBrokerage] = useState(0)
    const [clearingFee, setClearingFee] = useState(0)
    const [stampDuties, setStampDuties] = useState(0)
    const [netProfit, setNetProfit] = useState(0)

    const CalculateHandler = () => {

        //Not allow to edit data anymore
        setIsEdit(false)
        setPercentEdit(false)

        //Formula
        const totalSold = ((parseFloat(PriceSold)) * (parseFloat(ShareHeld)))
        const Market = ((MarketValue * (parseFloat(BrokeragePercent))) / 100)
        const Sold = ((totalSold * (parseFloat(BrokeragePercent))) / 100)
        const parseMinBrokerage = (parseFloat(MinBrokerage))
        const totalGross = (totalSold - MarketValue)
        const clearing = ((MarketValue * 0.03) / 100) + ((totalSold * 0.03) / 100)
        const stampDuty = ((MarketValue * 0.1) / 100) + ((totalSold * 0.1) / 100)
        const NetProfit = ((totalSold - MarketValue) - LBASBrokerage - clearingFee - stampDuties)
        const situation1 = (Market + Sold)
        const situation2 = (Market + (parseMinBrokerage))
        const situation3 = (parseMinBrokerage + Sold)
        const situation4 = (parseMinBrokerage + parseMinBrokerage)

        //Set result
        setTotalGrossProfit(totalGross.toFixed(2))
        
        if (Market > parseMinBrokerage && Sold > parseMinBrokerage) {
            setLBASBrokerage (situation1.toFixed(2))
        } else if ( Market > parseMinBrokerage && Sold < parseMinBrokerage ) {
            setLBASBrokerage (situation2.toFixed(2))
        } else if ( Market < parseMinBrokerage && Sold > parseMinBrokerage ) {
            setLBASBrokerage (situation3.toFixed(2))
        } else if ( Market < parseMinBrokerage && Sold < parseMinBrokerage) {
            setLBASBrokerage (situation4.toFixed(2))
        }
        setClearingFee(clearing.toFixed(2))
        setStampDuties(stampDuty.toFixed(2))
        setNetProfit(NetProfit.toFixed(2))

        //Recalculate
        setIsCalculate(!isCalculate)
    }

    const ReCalculateHandler = () => {
        setIsCalculate(true)
        setIsEdit(true)
        setPercentEdit(true)
        setDisable(true)
    }

    const PickerValueHandler = value => {
        if (value === 'pbb' || value === 'uob' || value === 'alliance') {
            setDisable(!disable)
        } else {
            setDisable(true)
        }
        setBrokerage(value)
    }

    const AmountHandler = () => {
        const ParseMarketValue = parseFloat((parseFloat(PricePurchased)) * ((parseFloat(ShareHeld))))
        setMarketValue(ParseMarketValue)
        if (Brokerage === 'mplus') {
            if (ParseMarketValue < 50000) {
                setBrokeragePercent("0.08")
            } else {
                setBrokeragePercent("0.05")
            }
            setMinBrokerage("8")
        } else if (Brokerage === 'pbb') {
            if (isIntraday == true) {
                setBrokeragePercent("0.15")
            } else if (ParseMarketValue < 100000) {
                    setBrokeragePercent("0.42")
            } else {
                    setBrokeragePercent("0.21")
            }
            setMinBrokerage("12")
        } else if (Brokerage === 'kenaga'){
            if (ParseMarketValue < 100000) {
                setBrokeragePercent("0.42")
            } else {
                setBrokeragePercent("0.21")
            }
            setMinBrokerage("12")
        } else if (Brokerage === 'rakuten') {
            if (ParseMarketValue < 1000) {
                setPercentEdit(!PercentEdit)
                setMinBrokerage("7")
            } else if (ParseMarketValue > 1000 && ParseMarketValue < 9999) {
                setPercentEdit(!PercentEdit)
                setMinBrokerage("9")
            } else if (ParseMarketValue > 10000) {
                setBrokeragePercent("0.10")
            }
        } else if (Brokerage === 'cimb') {
            setBrokeragePercent("0.0388")
            setMinBrokerage("8.88")
        } else if (Brokerage === 'mbb' || Brokerage === 'hlb') {
            setBrokeragePercent("0.10")
            setMinBrokerage("8")
        } else if (Brokerage === 'rhb') {
            if (ParseMarketValue < 100000) {
                setBrokeragePercent("0.42")
            } else {
                setBrokeragePercent("0.21")
            }
            setMinBrokerage("28")
        } else if (Brokerage === 'uob') {
            if (isIntraday == true) {
                setBrokeragePercent("0.10")
            } else if (ParseMarketValue < 100000) {
                    setBrokeragePercent("0.30")
            } else {
                    setBrokeragePercent("0.20")
            }
            setMinBrokerage("8")
        } else if (Brokerage === 'alliance') {
            if (isIntraday == true) {
                setBrokeragePercent("0.15")
            } else if (ParseMarketValue < 100000) {
                    setBrokeragePercent("0.42")
            } else {
                    setBrokeragePercent("0.21")
            }
            setMinBrokerage("12")
        }
        console.log(isEdit)
    }

    const PriceSoldHandler = value => {
        const totalSold = ((parseFloat(PriceSold)) * (parseFloat(ShareHeld)))
         
    }

    return (
        <TypeCalculator
        {...props}
        title="Brokerage Fee Calculator"
        >
            <View style={styles.container}>
                <Text>Brokerage Firm : </Text>
                <Picker
                selectedValue={Brokerage}
                style={{width: 130, height: 30}}
                onValueChange={PickerValueHandler}
                >   
                    <Picker.Item label="Custom"/>
                    <Picker.Item label="M+ Online" value="mplus" />
                    <Picker.Item label="Public Bank" value="pbb" />
                    <Picker.Item label="Kenaga Investors Berhad" value="kenaga" />
                    <Picker.Item label="Rakuten" value="rakuten" />
                    <Picker.Item label="CIMB Bank" value="cimb" />
                    <Picker.Item label="Maybank" value="mbb" />
                    <Picker.Item label="RHB Bank" value="rhb" />
                    <Picker.Item label="Hong Leong Bank" value="hlb" />
                    <Picker.Item label="UOB Kay Hian" value="uob" />
                    <Picker.Item label="Alliance Bank" value="alliance" />
                </Picker>
            </View>
            <View style={styles.container}>
                <Text>Intraday : </Text>
                <CheckBox 
                disabled={disable}
                value={isIntraday}
                onValueChange={(value) => setIsIntraday(value)}
                />
            </View>
            <View style={styles.container}>
                <Text>Price Purchased (RM) : </Text>
                <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                value={PricePurchased} 
                onChangeText={(value) => setPricePurchased(value)}
                editable={isEdit}
                />
            </View>
            <View style={styles.container}>
                <Text>Share Held (Units) : </Text>
                <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                value={ShareHeld} 
                onChangeText={(value) => setShareHeld(value)}
                onEndEditing={AmountHandler}
                editable={isEdit}
                />
            </View>
            <View style={styles.container}>
                <Text>Brokerage (%) : </Text>
                <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                value={BrokeragePercent}
                onChangeText={(value) => setBrokeragePercent(value)}
                editable={PercentEdit}
                />
            </View>
            <View style={styles.container}>
                <Text>Min Brokerage (RM) : </Text>
                <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                value={MinBrokerage}
                onChangeText={(value) => setMinBrokerage(value)}
                editable={isEdit}
                />
            </View>
            <View style={styles.container}>
                <Text>Price Sold (RM) : </Text>
                <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                value={PriceSold}
                onChangeText={(value) => setPriceSold(value)}
                onEndEditing={PriceSoldHandler}
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
                    <OutputCon 
                    title="Total Gross Profit (Loss) on Shares (RM) : "
                    value={totalGrossProfit}
                    />
                    <OutputCon 
                    title="Less Buying and Selling Brokerage (RM) : "
                    value={LBASBrokerage}
                    />
                    <OutputCon 
                    title="Clearing Fees (RM) : "
                    value={clearingFee}
                    />
                    <OutputCon 
                    title="Stamp Duties (RM) : "
                    value={stampDuties}
                    />
                    <OutputCon 
                    title="Net Profit (Loss) (RM) : "
                    value={netProfit}
                    />
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

export default BrokerageCalculator;