import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import BrokerageCalculator from '../calculators/brokerage';
 
const CalculatorScreen = props => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <BrokerageCalculator />
                <BrokerageCalculator />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center'
    }
})

export default CalculatorScreen;