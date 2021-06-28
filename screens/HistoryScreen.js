import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HistoryCon from '../components/HistoryMainConn';

const HistoryScreen = () => {
    return(
        <View style={styles.container}>
            <HistoryCon 
            title="Buy History : "
            />
            <HistoryCon 
            title="Sell History : "
            />
            <HistoryCon 
            title="Withdraw History : "
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
});

export default HistoryScreen;