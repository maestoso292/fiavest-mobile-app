import { CommonActions } from "@react-navigation/native";
import React from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

const NavigationMenu = ({ navigation }) => {
  const buttonPressHandler = (name) => {
    navigation.dispatch(CommonActions.navigate({ name: name}));
  };
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.menu}>
        <View style={styles.menuRow}>
          <MenuButton
            onPress={buttonPressHandler.bind(this, "Home")}
          />
          <MenuButton
            onPress={buttonPressHandler.bind(this, "Stocks")}
          />
        </View>

        <View style={styles.menuRow}>
          <MenuButton />
          <MenuButton />
        </View>

        <View style={styles.menuRow}>
          <MenuButton />
          <MenuButton />
        </View>

        <View style={styles.menuRow}>
          <MenuButton />
          <MenuButton />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MenuButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.menuButton, ...props.style }}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 10,
  },
  menuRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  menuButton: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default NavigationMenu;
