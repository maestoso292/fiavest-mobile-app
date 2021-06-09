import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image } from 'react-native';
import AuthScreen from './screens/AuthScreen';

export default class App extends Component {
  render() {
    return (
      <AuthScreen />
    );
  }
};

const styles = StyleSheet.create({});
