import React, { useCallback, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Image, Text, ScrollView, Button,  } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Input } from 'react-native-elements';

function Login() {
  return (
    <View style={styles.loginContainer}>
      <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
        <Input 
          label="E-Mail"
          keyboardType="email-address"
          placeholder="Please enter email address"
          autoCapitalize="none"
          errorText="Please enter a valid email address"
          //onInputChange={}
          initialValue=""
        />
        <Input 
          label="Password"
          keyboardType="default"
          placeholder="Please enter password"
          secureTextEntry
          errorText="Password Incorrect"
          initialValue=""
          autoCapitalize="none"
        />
        
        <View style={styles.Button}>
        <Button 
        title="Login"
        //color="yellow"
        onPress={() => {}}
        />
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function Register() {
  return (
    <View style={styles.registerContainer}>
      <Text>Ko</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const AuthScreen = props => {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image 
          source = {require('../assets/fiavest-logo2.png')}
          style = {styles.img}
          />
        </View>
        <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="LOGIN" component={Login} />
              <Tab.Screen name="REGISTER" component={Register} />
            </Tab.Navigator>
        </NavigationContainer>
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
      marginLeft: 16,
      marginTop: 16,

      //justifyContent: 'center',
      //alignItems: 'center',
    },

    registerContainer: {
      //backgroundColor: '#A9BADB',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    screen: {
      flex: 1,
    },

    Button: {
      width: 150,
      marginLeft: 16,
    }

});

export default AuthScreen;