import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SignInPage from "../small screen/SignIn";
import SignUpPage from "../small screen/SignUp";
import LogoBackground from "../assets/logo-back.png"
import GridBackground from "../assets/grid.png"
import Logo from "../assets/login-Logo.png"

const AuthScreen = (props) => {
  const Tab = createMaterialTopTabNavigator();

  function Login() {
    return (
      <ImageBackground source={GridBackground} style={styles.loginContainer}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={-56}
          style={styles.screen}
        >
          <SignInPage />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  function Register() {
    return (
      <ImageBackground source={GridBackground} style={styles.registerContainer}>
        <KeyboardAvoidingView
          behavior="padding"
          // Somehow there's white spaces above keyboard if >30
          keyboardVerticalOffset={-56}
          style={styles.screen}
        >
          <SignUpPage />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={LogoBackground} style={styles.imgContainer}>
        <Image
          source={Logo}
          style={styles.img}
        />
      </ImageBackground>
      <Tab.Navigator 
      backBehavior="none"
      keyboardDismissMode="on-drag"
      tabBarOptions={{
        labelStyle: {
          fontSize: 15,
          fontWeight: "bold",
          letterSpacing: 1,
        },
        activeTintColor: 'white',
        inactiveTintColor: '#D3D3D3',
        style: {backgroundColor: "#454545", color: "white"},
        indicatorStyle: {borderColor: "white", borderBottomWidth: 4}
      }}
      >
        <Tab.Screen name="LOGIN" component={Login} />
        <Tab.Screen name="REGISTER" component={Register} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    paddingVertical: 15,
    marginTop: 30,
    width: 'auto',
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: 'cover',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  img: {
    width: "100%",
    height: "100%",
    // borderWidth: 1,
    // borderColor: 'yellow',
    resizeMode: "contain",
  },

  loginContainer: {
    //backgroundColor: '#A9BAFF',
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  registerContainer: {
    //backgroundColor: '#A9BADB',
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  screen: {
    flex: 1,
    width: "100%",
  },
});

export default AuthScreen;
