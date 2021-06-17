import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  } from '@expo/vector-icons';

import AppNavigator from "./navigation/AppNavigator";
import navReducer from "./store/reducers/navigation";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
  auth: authReducer,
  navigation: navReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
