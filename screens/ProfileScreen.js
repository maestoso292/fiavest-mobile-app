import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import CardBase from "../components/base/CardBase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TouchableCustom from "../components/base/TouchableCustom";
import {
  BACKGROUND_LIGHT,
  BORDER_PRIMARY,
  POPUP_LIGHT,
} from "../constants/colors";
import * as authActions from "../store/actions/auth";
import DetailsCard from "../components/detailsCard";

const ProfileScreen = (props) => {

  const [userInfo, setUserInfo] = useState([])
  const dispatch = useDispatch();

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData")
    const jsonData = JSON.parse(userData)
    console.log(jsonData);
    console.log(jsonData.token);
    console.log(jsonData.userId);
    const response = await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/private/user/fetch-user-details",
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "sessionId": `${jsonData.token}`
        },
        body: JSON.stringify({
          uuid: jsonData.userId
        })
      }
    )
    if(!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData.error.message);
      if (errorResData.error.message === "Session expired") {
        Alert.alert("Session Expired", "Please Log In Again", [{text: "Okay"}]);
        dispatch(authActions.logout())
      }
    } else {
      const resData = await response.json()
      console.log(resData);
      return resData;
    }
  }

  useEffect(() => {
    const getAction = async () => {
      const getInfo = await getUserData();
      if (getInfo) setUserInfo(getInfo)
    };
    getAction();
  }, [props])

  return (
    <View style={styles.screen}>
      <DetailsCard 
      title="Username"
      content={userInfo.nameGiven + " " + userInfo.nameFamily}
      />
      <DetailsCard 
      title="Address (State)"
      content={userInfo.address}
      />
      <DetailsCard 
      title="Broking House"
      content={userInfo.brokingHouse}
      />
      <DetailsCard 
      title="Investment Term"
      content={userInfo.investmentTerm}
      />
      <DetailsCard 
      title="Phone Num"
      content={userInfo.phoneNum}
      />
      <DetailsCard 
      title="Trading Experience"
      content={userInfo.tradingExp + " years"}
      />
      <CardBase style={styles.buttonContainer}>
        <TouchableCustom
          useAndroid
          type="highlight"
          onPress={() => dispatch(authActions.logout())}
          contentStyle={styles.buttonContent}
        >
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableCustom>
      </CardBase>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: BACKGROUND_LIGHT,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: "auto",
    marginBottom: 20,
  },
  buttonContent: {
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "red",
    letterSpacing: 1,
  },
});

export default ProfileScreen;
