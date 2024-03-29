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
    <TouchableCustom
      onPress={() => navigation.goBack()}
      containerStyle={styles.screen}
      contentStyle={styles.screen}
    >
      <View style={styles.menu}>
        <View style={styles.menuRow}>
          <MenuButton
            name={Routes.HOME}
            onPress={buttonPressHandler.bind(this, Routes.HOME)}
            style={current == Routes.HOME ? styles.menuButtonHighlight : {}}
            style={{backgroundColor: "#00a8ff"}}
          >
            <Ionicons name="home" size={ICON_SIZE} color="white" />
          </MenuButton>
          <MenuButton
            name={Routes.STOCKS}
            onPress={buttonPressHandler.bind(this, Routes.STOCKS)}
            style={
              current == Routes.STOCKS_SEARCH ? styles.menuButtonHighlight : {}
            }
            style={{backgroundColor: "#bfa634"}}
          >
            <FontAwesome5 name="coins" size={ICON_SIZE} color="white" />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton
            name={Routes.PORTFOLIO}
            onPress={buttonPressHandler.bind(this, Routes.PORTFOLIO)}
            style={
              current == Routes.PORTFOLIO ? styles.menuButtonHighlight : {}
            }
            style={{backgroundColor: "#ca6809"}}
          >
            <Ionicons name="briefcase" size={ICON_SIZE} color="white" />
          </MenuButton>
          <MenuButton
            name={Routes.EMA5}
            onPress={buttonPressHandler.bind(this, Routes.EMA5)}
            style={current == Routes.EMA5 ? styles.menuButtonHighlight : {}}
            style={{backgroundColor: "#25852b"}}
          >
            <Entypo name="line-graph" size={ICON_SIZE} color="white" />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton
            name={Routes.CALCULATOR}
            onPress={buttonPressHandler.bind(this, Routes.CALCULATOR)}
            style={
              current == Routes.CALCULATOR ? styles.menuButtonHighlight : {}
            }
            style={{backgroundColor: "#6c2fc7"}}
          >
            <Ionicons name="calculator" size={ICON_SIZE} color="white" />
          </MenuButton>
          <MenuButton
            name={Routes.NEWS}
            onPress={buttonPressHandler.bind(this, Routes.NEWS)}
            style={current == Routes.NEWS ? styles.menuButtonHighlight : {}}
            style={{backgroundColor: "#2fc2c7"}}
          >
            <Ionicons name="newspaper" size={ICON_SIZE} color="white" />
          </MenuButton>
        </View>

        <View style={styles.menuRow}>
          <MenuButton
            name={Routes.HISTORY}
            onPress={buttonPressHandler.bind(this, Routes.HISTORY)}
            style={current == Routes.HISTORY ? styles.menuButtonHighlight : {}}
            style={{backgroundColor: "#1755b1"}}
          >
            <MaterialIcons name="history" size={ICON_SIZE} color="white" />
          </MenuButton>
          <MenuButton
            name={Routes.PROFILE}
            onPress={buttonPressHandler.bind(this, Routes.PROFILE)}
            style={current == Routes.PROFILE ? styles.menuButtonHighlight : {}}
            style={{backgroundColor: "#b1172d"}}
          >
            <Ionicons name="person-circle" size={ICON_SIZE} color="white" />
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
          <Text style={{color: "white", fontWeight: "700"}}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
  },
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
    // borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButtonHighlight: {
    opacity: 0.7,
  },
  menuButtonText: {
    marginTop: 5,
  },
});

export default NavigationMenu;
