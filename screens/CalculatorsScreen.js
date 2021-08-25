import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import BrokerageCalculator from '../calculators/brokerage';
import DividendCalculator from '../calculators/dividend';
import RightIssuedCalculator from '../calculators/right_Issued';
import BonusIssuedCalculator from '../calculators/bonus_Issued';
import ProfitAndLostCalculator from '../calculators/profitNLost';

const CalculatorScreen = props => {

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{width: "100%"}}>
                <View>
                    <BrokerageCalculator />
                    <DividendCalculator />
                    <RightIssuedCalculator />
                    <BonusIssuedCalculator />
                    <ProfitAndLostCalculator />
                </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "black",
    }
})

export default CalculatorScreen;