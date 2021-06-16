import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Image, Text, ScrollView, ActivityIndicator, Button, TouchableOpacity  } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SignInPage from '../small screen/SignIn';
import SignUpPage from '../small screen/SignUp';

const AuthScreen = props => {

  const Tab = createMaterialTopTabNavigator();

  function Login() {
    return (
      <View style={styles.loginContainer}>
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
          <SignInPage />
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  function Register() {
    return (
      <View style={styles.registerContainer}>
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
          <SignUpPage />
        </KeyboardAvoidingView>
      </View>
    );
  };

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image 
          source = {require('../assets/fiavest-logo2.png')}
          style = {styles.img}
          />
        </View>
          <Tab.Navigator>
            <Tab.Screen name="LOGIN" component={Login} />
            <Tab.Screen name="REGISTER" component={Register} />
          </Tab.Navigator>
      </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        //backgroundColor: 'yellow',
      },
    imgContainer: {
        marginHorizontal: 32,
        marginTop: 16,
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        //borderColor: 'black',
      },
    img: {
        width: '100%',
        height: '100%',
        //borderWidth: 1,
        //borderColor: 'yellow',
        resizeMode: 'contain',
    },

    loginContainer: {
      //backgroundColor: '#A9BAFF',
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    registerContainer: {
      //backgroundColor: '#A9BADB',
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    screen: {
      flex: 1,
      width: '100%',
    },

});

export default AuthScreen;