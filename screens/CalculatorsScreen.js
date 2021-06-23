import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import BrokerageCalculator from '../calculators/brokerage';
import DividendCalculator from '../calculators/dividend';
import RightIssuedCalculator from '../calculators/right_Issued';
import BonusIssuedCalculator from '../calculators/bonus_Issued';
import ProfitAndLostCalculator from '../calculators/profitNLost';

const CalculatorScreen = props => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <BrokerageCalculator />
                <DividendCalculator />
                <RightIssuedCalculator />
                <BonusIssuedCalculator />
                <ProfitAndLostCalculator />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center'
    }
})

export default CalculatorScreen;