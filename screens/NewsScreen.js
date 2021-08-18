import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { StyleSheet, View, Text, Linking, Button } from 'react-native';
import DetailsForm from '../components/DetailsForm';

const NewsScreen = () => {

    return (
        <View style={styles.container}>
            <DetailsForm />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: '#A9BAFF',
    }
});

export default NewsScreen;