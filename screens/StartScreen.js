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
      try {
        await Facebook.initializeAsync({
          appId: "484772439271129",
        });
      } catch (err) {
        console.log(err);
      }

      // await AsyncStorage.removeItem("userData");
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        dispatch(authActions.setDidAutoLogin());
        return;
      }

      const { token, userId, expiryDate, refreshToken, method } =
        JSON.parse(userData);

      switch (method) {
        case authActions.LOGIN_METHODS.EMAIL:
          // Refresh token 1 min early. Extra time just in case.
          if (Date.now() <= expiryDate - 60000) {
            dispatch(
              authActions.authenticate(userId, token, expiryDate, method)
            );
            return;
          }
          // Refreshes token
          dispatch(authActions.refreshTokenEmail(refreshToken)).catch((err) => {
            console.log(err);
            AsyncStorage.removeItem("userData");
            dispatch(setDidAutoLogin());
          });
          break;
        case authActions.LOGIN_METHODS.FACEBOOK:
          dispatch(authActions.autoLoginViaFacebook);
          break;
        case authActions.LOGIN_METHODS.GOOGLE:
          // No fix for auto login as of now. May require API_KEY for Google REST API
          // dispatch(authActions.autoLoginViaGoogle(transformData.refreshToken));
          dispatch(authActions.setDidAutoLogin);
          break;
        default:
          console.log("This shouldn't be happening. Check user data stored");
      }
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
