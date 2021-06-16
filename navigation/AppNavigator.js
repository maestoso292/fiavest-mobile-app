import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { MainNavigator, AuthNavigator } from './MainNavigator';
import StartScreen from '../screens/StartScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didAutoLogin = useSelector(state => state.auth.didAutoLogin);

    return (
        <NavigationContainer>
            {isAuth && <MainNavigator />}
            {!isAuth && didAutoLogin && <AuthNavigator />}
            {!isAuth && !didAutoLogin && <StartScreen />}
        </NavigationContainer>
    );
};

export default AppNavigator;