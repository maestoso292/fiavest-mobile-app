import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as Facebook from "expo-facebook";

import * as authActions from "../store/actions/auth";

const StartScreen = (props) => {
  const dispatch = useDispatch();

  // TODO tryLogin can probably be broken down into separate functions
  useEffect(() => {
    const tryLogin = async () => {
      // Facebook auto login
      try {
        await Facebook.initializeAsync({
          appId: "484772439271129",
        });
        const userDataFB = await Facebook.getAuthenticationCredentialAsync();
        if (userDataFB) {
          // console.log(userDataFB);
          // TODO Unsure how expiration date needs to be handled. For refresh token?
          dispatch(authActions.authenticate(userDataFB.userId, userDataFB.token, userDataFB.expirationDate));
          return;
        }
      } catch (err) {
        console.log(err);
      }

      // Firebase auto login
      const userData = await AsyncStorage.getItem("userData");
      console.log(userData);
      if (!userData) {
        dispatch(authActions.setDidAutoLogin());
        return;
      }

      const transformData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformData;
      const expirationDate = new Date(expiryDate);
      
      const currentTime = new Date( new Date().getTime());
      const currentMili = currentTime.setSeconds(new Date().getSeconds());

      const diff = ((expiryDate - currentMili) / 3600).toFixed(0);

      console.log(diff);

      {/*if (diff <= 0) {
        dispatch(authActions.refreshToken());
        return;
      }*/}

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidAutoLogin());
        return;
      }

      dispatch(authActions.authenticate(userId, token));
    };

    tryLogin().catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="#ccc" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartScreen;
