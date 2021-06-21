import { CommonActions, useRoute } from "@react-navigation/native";
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
import { Routes } from "../constants/routes";
import TouchableCustom from "../components/base/TouchableCustom";

const ICON_SIZE = 36;

// TODO Add onPress handlers for all buttons
const NavigationMenu = ({ navigation }) => {
  const buttonPressHandler = (name) => {
    navigation.dispatch(CommonActions.navigate({ name: name }));
  };
  const route = useRoute();
  const { current } = route.params;
  return (
    <TouchableCustom onPress={() => navigation.goBack()}>
      <View style={styles.menu}>
        <View style={styles.menuRow}>
          <MenuButton
            name={Routes.HOME}
            onPress={buttonPressHandler.bind(this, Routes.HOME)}
            style={current == Routes.HOME ? styles.menuButtonHighlight : {}}
          >
            <Ionicons name="home" size={ICON_SIZE} />
          </MenuButton>
          <MenuButton
            name={Routes.STOCKS}
            onPress={buttonPressHandler.bind(this, Routes.STOCKS)}
            style={
              current == Routes.STOCKS_SEARCH ? styles.menuButtonHighlight : {}
            }
          >
            <FontAwesome5 name="coins" size={ICON_SIZE} />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton
            name={Routes.PORTFOLIO}
            style={
              current == Routes.PORTFOLIO ? styles.menuButtonHighlight : {}
            }
          >
            <Ionicons name="briefcase" size={ICON_SIZE} />
          </MenuButton>
          <MenuButton
            name={Routes.EMA5}
            style={current == Routes.EMA5 ? styles.menuButtonHighlight : {}}
          >
            <Entypo name="line-graph" size={ICON_SIZE} />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton
            name={Routes.CALCULATOR}
            style={
              current == Routes.CALCULATOR ? styles.menuButtonHighlight : {}
            }
          >
            <Ionicons name="calculator" size={ICON_SIZE} />
          </MenuButton>
          <MenuButton
            name={Routes.NEWS}
            style={current == Routes.NEWS ? styles.menuButtonHighlight : {}}
          >
            <Ionicons name="newspaper" size={ICON_SIZE} />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton
            name={Routes.HISTORY}
            style={current == Routes.HISTORY ? styles.menuButtonHighlight : {}}
          >
            <MaterialIcons name="history" size={ICON_SIZE} />
          </MenuButton>
          <MenuButton
            name={Routes.PROFILE}
            onPress={buttonPressHandler.bind(this, Routes.PROFILE)}
            style={current == Routes.PROFILE ? styles.menuButtonHighlight : {}}
          >
            <Ionicons name="person-circle" size={ICON_SIZE} />
          </MenuButton>
        </View>
      </View>
    </TouchableCustom>
  );
};

const MenuButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
      <View style={{ ...styles.menuButton, ...props.style }}>
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
  menuButtonHighlight: {
    backgroundColor: "#ffeebf",
  },
  menuButtonText: {
    marginTop: 5,
  },
});

export default NavigationMenu;
