import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as Facebook from "expo-facebook";

import * as authActions from "../store/actions/auth";
import { CommonActions } from "@react-navigation/native";
import { Routes } from "../constants/routes";

const StartScreen = ({ navigation }) => {
  // AsyncStorage.removeItem("userData");
  // AsyncStorage.removeItem("tokenPermission");
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

      const { sessionId, uuid, method } = JSON.parse(userData);

      switch (method) {
        case authActions.LOGIN_METHODS.EMAIL:
          if (sessionId !== "") {
            dispatch(authActions.authenticate(uuid, sessionId));
            return;
          }
          // Refresh token 1 min early. Extra time just in case.
          // if (Date.now() <= expiryDate - 60000) {
          //   dispatch(
          //     authActions.authenticate(userId, token, expiryDate, method)
          //   );
          //   return;
          // }
          // // Refreshes token
          // dispatch(authActions.refreshTokenEmail(refreshToken)).catch((err) => {
          //   console.log(err);
          //   AsyncStorage.removeItem("userData");
          //   dispatch(setDidAutoLogin());
          // });
          // dispatch(authActions.setDidAutoLogin)
          break;
        case authActions.LOGIN_METHODS.FACEBOOK:
          dispatch(authActions.autoLoginViaFacebook).then((result) => {
            if (result.isNewUser) {
              navigation.navigate(Routes.DETAILS_FORM, result);
            } else {
              dispatch(
                authActions.authenticate(
                  result.uuid,
                  result.sessionId,
                  result.additionalData
                )
              );
            }
          });
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
