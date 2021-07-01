import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import BuyHistory from '../Historys/BuyHistory';
import SellHistory from '../Historys/SellHistory';
import WithdrawHistory from '../Historys/WithdrawHistory';

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