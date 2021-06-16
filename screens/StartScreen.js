import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../store/actions/auth";

const StartScreen = (props) => {
  const dispatch = useDispatch();
  // I don't know what this value is? Not inside reducers/auth.js
  const didAutoLogin = useSelector((state) => state.auth.didAutoLogin);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData == null) {
        //props.navigation.navigate("Auth");
        dispatch(authActions.setDidTryAL());
        return;
      }

      const transformData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidTryAL());
        // props.navigation.navigate("Auth");
        return;
      }

      //const expirationTime = expirationDate.getTime() - new Date().getTime();

      // navigation.navigate("Home");
      dispatch(
        authActions.authenticate(userId, token, {
          /*, expirationTime*/
        })
      );
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
