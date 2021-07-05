import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import BuyHistory from '../components/history/BuyHistory';
import SellHistory from '../components/history/SellHistory';
import WithdrawHistory from '../components/history/WithdrawHistory';

const HistoryScreen = () => {

    const Tab = createMaterialTopTabNavigator();

    return(
        <View style={styles.container}>
            <Tab.Navigator
                backBehavior="firstRoute"
                initialRouteName="Buy"
                tabBarOptions={{
                    labelStyle: {
                        fontSize: 15,
                        fontWeight: 'bold'
                    },
                    activeTintColor: 'blue',
                    inactiveTintColor: 'grey'
                    // style: { backgroundColor: 'honeydew' },
                    // indicatorStyle: { backgroundColor: 'yellow' }
                }}
            >
                <Tab.Screen name="Buy" component={BuyHistory} />
                <Tab.Screen name="Sell" component={SellHistory} />
                <Tab.Screen name="Withdraw" component={WithdrawHistory} />
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } 
});

export default HistoryScreen;