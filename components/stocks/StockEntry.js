import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TouchableCustom from "../base/TouchableCustom";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../../constants/colors";
import { Routes } from "../../constants/routes";
import { currencyFormatter } from "../../constants/formatter";

const StockEntry = (props) => {
  
  return (
    <TouchableCustom
      type="highlight"
      useAndroid
      containerStyle={styles.rootContainer}
      contentStyle={{ width: "100%", height: "100%" }}
      onPress={props.onPress}
    >
      <View style={styles.textContainer}>
        <View style={styles.idContainer}>
          <Text style={styles.entryText}>{props.id}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.entryText}>{props.name}</Text>
        </View>
      </View>
    </TouchableCustom>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: 45,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    backgroundColor: POPUP_LIGHT,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: "hidden",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 10,
    borderTopColor: BORDER_PRIMARY,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#454545",
    borderRadius: 10,
  },
  idContainer: {
    flex: 2,
    alignItems: "center",
  },
  nameContainer: {
    flex: 2,
    alignItems: "center",
  },
  entryText: {
    color: "white",
  }
});

export default StockEntry;
