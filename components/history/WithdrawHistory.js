import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { HISTORY_DATA } from '../../data/dummy_history';
import HistoryCon from './HistoryMainConn';
import HistoryContainer from './History-Conn';

const fetchHistory = () => {
    const data = Object.values(HISTORY_DATA);
    return data;
};

const HistoryRender = ({ item }) => {
    return (
    <HistoryContainer
        date={item.date}
        name={item.name}
        total={item.total}
    />
    );
};

const WithdrawHistory = props => {

    const [histories] = useState(fetchHistory())

    return (
        <HistoryCon
        title="Withdraw History"
        >
            <View style={styles.listContainer}>
                <FlatList 
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                data={histories}
                keyExtractor={(item) => item.id}
                renderItem={HistoryRender}
                />
            </View>
        </HistoryCon>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 10,
        marginBottom: 20
    },
    list: {
        flexGrow: 1
    }
});

export default WithdrawHistory;