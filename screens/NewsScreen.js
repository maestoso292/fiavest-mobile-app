import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { StyleSheet, View, Text, Linking, Button } from 'react-native';
import DetailsForm from '../components/DetailsForm';

const NewsScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={{color: "white"}}>Test</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black',
    }
});

export default NewsScreen;