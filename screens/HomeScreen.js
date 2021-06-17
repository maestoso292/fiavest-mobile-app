import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Button } from 'react-native';

import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';

import { ImageSwiper } from '../components/AdSwiper';
import ItemCard from '../components/ItemCard';

const images = [
    "https://cdn.business2community.com/wp-content/uploads/2013/09/best-press-release-example.jpg",
    "https://en.pimg.jp/054/313/779/1/54313779.jpg",
    "https://secureservercdn.net/160.153.138.163/t55.c04.myftpupload.com/wp-content/uploads/2016/01/IB-Examples.jpg",
    "https://image.shutterstock.com/image-illustration/server-room-center-exchanging-cyber-260nw-784596430.jpg"
];

const HomeScreen = () => {

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Button title={'Sign Out'} 
            onPress={() => {dispatch(authActions.logout())}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    }
});

export default HomeScreen;