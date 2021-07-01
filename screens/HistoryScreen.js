import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import BuyHistory from '../components/history/BuyHistory';
import SellHistory from '../components/history/SellHistory';
import WithdrawHistory from '../components/history/WithdrawHistory';

const HistoryScreen = () => {
    return(
        <View style={styles.container}>
            <BuyHistory />
            <SellHistory />
            <WithdrawHistory />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
});

export default HistoryScreen;