import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
//use dispatch when add logout function
//import { useDispatch } from 'react-redux';

import HomeScreen from "../screens/HomeScreen";
import AuthScreen from "../screens/AuthScreen";
import StartScreen from "../screens/StartScreen";
import { useSelector } from "react-redux";

const MainDrawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const StartStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <MainDrawer.Navigator>
      <MainDrawer.Screen name="Home" component={HomeNavigator} />
    </MainDrawer.Navigator>
  );
};

export const AuthNavigator = () => {
  const didAutoLogin = useSelector((state) => state.auth.didAutoLogin);

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
