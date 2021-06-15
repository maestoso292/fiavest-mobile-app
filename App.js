/* 
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <AuthScreen />
      {Following element is for changing style of the status bar based on app theme (unsure)}
      <StatusBar style="auto" />
    </View> */
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {} from "@expo/vector-icons";

import MainNavigator from "./navigation/MainNavigator";
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
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
