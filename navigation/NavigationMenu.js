import { CommonActions } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../constants/colors";
import { ROUTE_NAMES } from "./AppNavigator";

const ICON_SIZE = 36;

// TODO Add onPress handlers for all buttons
const NavigationMenu = ({ navigation }) => {
  const buttonPressHandler = (name) => {
    navigation.dispatch(CommonActions.navigate({ name: name }));
  };
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.menu}>
        <View style={styles.menuRow}>
          <MenuButton
            name={ROUTE_NAMES.HOME}
            onPress={buttonPressHandler.bind(this, ROUTE_NAMES.HOME)}
          >
            <Ionicons name="home" size={ICON_SIZE} />
          </MenuButton>
          <MenuButton
            name={ROUTE_NAMES.STOCKS}
            onPress={buttonPressHandler.bind(this, ROUTE_NAMES.STOCKS)}
          >
            <FontAwesome5 name="coins" size={ICON_SIZE} />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton name={ROUTE_NAMES.PORTFOLIO}>
            <Ionicons name="briefcase" size={ICON_SIZE} />
          </MenuButton>
          <MenuButton name={ROUTE_NAMES.EMA5}>
            <Entypo name="line-graph" size={ICON_SIZE} />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton name={ROUTE_NAMES.CALCULATOR}>
            <Ionicons name="calculator" size={ICON_SIZE} />
          </MenuButton>
          <MenuButton name={ROUTE_NAMES.NEWS}>
            <Ionicons name="newspaper" size={ICON_SIZE} />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton name={ROUTE_NAMES.HISTORY}>
            <MaterialIcons name="history" size={ICON_SIZE} />
          </MenuButton>
          <MenuButton name={ROUTE_NAMES.PROFILE}>
            <Ionicons name="person-circle" size={ICON_SIZE} />
          </MenuButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MenuButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
      <View style={styles.menuButton}>
        {props.children}
        <View style={styles.menuButtonText}>
          <Text>{props.name}</Text>
        </View>
      </View>
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
    backgroundColor: POPUP_LIGHT,
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButtonText: {
    marginTop: 5,
  },
});

export default NavigationMenu;
