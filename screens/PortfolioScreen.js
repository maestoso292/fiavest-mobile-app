import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, KeyboardAvoidingView } from 'react-native';

import Container from '../components/Portfolio-Conn';
import Button2 from '../components/Button2';
import SellPopUp from '../components/SellPopUp';

const renderStock = ({ item }) => {
    return <Container name={item.name} lots={item.lots} price={item.price} />
};

const fetchStockData = () => {
    const data = [
        {
            id: "1",
            name: '1155 MAYBANK',
            lots: '10',
            price: '81.8'
        },
        {
            id: "2",
            name: '5099 AIRASIA',
            lots: '100',
            price: '92'
        },
        {
            id: "3",
            name: '7079 TIGER',
            lots: '1000',
            price: '55'
        },
        {
            id: "4",
            name: '0001 SCOMNET',
            lots: '100',
            price: '163'
        },
    ];
    return data;
};

const PortfolioScreen = props => {

    const [stocks, setStocks] = useState(fetchStockData());
    const [totalAmount, setTotalAmount] = useState(100.65);
    const [popupVisible, setPopupVisible] = useState(false);

    const closePopup = () => {
        setPopupVisible(false);
    };

    const openPopup = () => {
        setPopupVisible(true);
    };

    return(
        <View style={styles.mainCon}>
            <SellPopUp
            visible={popupVisible}
            onClose={closePopup}
            animationType="fade"
            />
            <View style={styles.header}>
                <View style={{width: '40%', borderEndWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>ID & Name</Text>
                </View>
                <View style={{width: '20%', borderEndWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Lot (x100)</Text>
                </View>
                <View style={{width: '30%', borderEndWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Price (RM)</Text>
                </View>
                <View style={{width: '10%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Sell</Text>
                </View>
            </View>
            <View style={styles.listCon}>
                <FlatList 
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                data={stocks}
                keyExtractor={(item) => item.id}
                renderItem={renderStock}
                />
            </View>
            <View style={styles.totalCon}>
                <View>
                    <Text style={{fontSize: 20}}>Total : RM <Text style={{fontWeight: 'bold'}}>{totalAmount}</Text></Text>
                </View>
                <Button2 onPress={openPopup}>SELL</Button2>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainCon: {
        flex: 1,
        padding: 10,
    },
    header: {
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    totalCon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: 60,
        paddingHorizontal: 10
    },
    listCon : {
        flex: 1,
        width: '100%',
        marginTop: 15,
    },
    list: {
        flexGrow: 1,
    }
});

export default PortfolioScreen;