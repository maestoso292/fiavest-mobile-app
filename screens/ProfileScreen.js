import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import CardBase from "../components/base/CardBase";
import TouchableCustom from "../components/base/TouchableCustom";
import {
  BACKGROUND_LIGHT,
  BORDER_PRIMARY,
  POPUP_LIGHT,
} from "../constants/colors";
import * as authActions from "../store/actions/auth";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <CardBase style={styles.card}>
        <View style={styles.fieldContainer}>
          <Text>Username</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>Sample Name</Text>
        </View>
      </CardBase>
      <CardBase style={styles.card}>
        <View style={styles.fieldContainer}>
          <Text>NRIC/Passport</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>Sample Name</Text>
        </View>
      </CardBase>
      <CardBase style={styles.card}>
        <View style={styles.fieldContainer}>
          <Text>Address</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>Address Line 1</Text>
          <Text>Address Line 2</Text>
          <Text>Address Line 3</Text>
        </View>
      </CardBase>
      <CardBase style={styles.card}>
        <View style={styles.fieldContainer}>
          <Text>Phone No.</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>0111111111</Text>
        </View>
      </CardBase>
      <CardBase style={styles.buttonContainer}>
        <TouchableCustom
          useAndroid
          type="highlight"
          // containerStyle={styles.buttonContainer}
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
  card: {
    width: "90%",
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  fieldContainer: {
    flex: 1,
    padding: 10,
  },
  dataContainer: {
    flex: 2,
    borderLeftColor: BORDER_PRIMARY,
    borderLeftWidth: StyleSheet.hairlineWidth,
    padding: 10,
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
