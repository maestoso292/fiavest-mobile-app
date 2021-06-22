import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import TouchableCustom from "../base/TouchableCustom";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../../constants/colors";

const StockEntry = (props) => {
  const uri = "https://assets.cmcmarkets.com/images/fibonacci_swing_trade_example_chart_small.png";
  return (
    <TouchableCustom
      type="highlight"
      useAndroid
      containerStyle={styles.rootContainer}
      onPress={()=>{}}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: uri}} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.idContainer}>
          <Text>{props.id}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text>{props.name}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text>{props.price}</Text>
        </View>
      </View>
    </TouchableCustom>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: 200,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    backgroundColor: POPUP_LIGHT,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 4,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%"
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 5,
    paddingLeft: 10,
    borderTopColor: BORDER_PRIMARY,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  idContainer: {
    flex: 1,
  },
  nameContainer: {
    flex: 5,
  },
  priceContainer: {
    flex: 1,
  },
});

export default StockEntry;