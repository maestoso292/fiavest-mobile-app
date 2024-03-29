import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import CardBase from "../components/base/CardBase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BACKGROUND_LIGHT,
  BORDER_PRIMARY,
  POPUP_LIGHT,
} from "../constants/colors";
import * as authActions from "../store/actions/auth";
import DetailsCard from "../components/detailsCard";
import MyButton from "../components/MyButton";

const ProfileScreen = (props) => {

  const [userInfo, setUserInfo] = useState([])
  const dispatch = useDispatch();

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData")
    const jsonData = await JSON.parse(userData)
    // console.log(jsonData);
    const response = await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/private/user/fetch-user-details",
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "sessionId": `${jsonData.sessionId}`
        },
        body: JSON.stringify({
          uuid: jsonData.uuid
        })
      }
    )
    if(!response.ok) {
      const errorResData = await response.json();
      // console.log(errorResData);
      if (errorResData.error.message === "Session expired") {
        Alert.alert("Session Expired...", "Please Login Again...", [{text: "Okay"}])
        dispatch(authActions.logout())
      }
    } else {
      const resData = await response.json()
      // console.log(resData);
      return resData;
    }
  }

  useEffect(() => {
    const getAction = async () => {
      const getInfo = await getUserData();
      if (getInfo) {
        setUserInfo(getInfo)
      } else {
        setUserInfo([])
      }
    };
    getAction();
  }, [])

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
        <MyButton onPress={() => dispatch(authActions.logout())}>LOGOUT</MyButton>
      </CardBase>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
  },
  buttonContainer: {
    borderRadius: 15,
    marginTop: "auto",
    marginBottom: 20,
  }
});

export default ProfileScreen;
