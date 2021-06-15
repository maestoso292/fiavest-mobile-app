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
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  } from '@expo/vector-icons';

import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
