import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

const StartScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (userData == null) {
                props.navigation.navigate('Auth');
                return;
            }

            const transformData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId ) {
                props.navigation.navigate('Auth');
                return;
            }

            //const expirationTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Home');
            dispatch(authActions.authenticate(userId, token, {/*, expirationTime*/}));

        };

        tryLogin();

    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color='#ccc' />
        </View>
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartScreen;