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
                        fontWeight: "bold",
                        letterSpacing: 1,
                    },
                    activeTintColor: 'white',
                    inactiveTintColor: '#D3D3D3',
                    style: {backgroundColor: "grey", color: "white"},
                    indicatorStyle: {borderColor: "white", borderBottomWidth: 4}
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
        flex: 1,
    },
});

export default HistoryScreen;