import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import HeaderButton from "../components/base/HeaderButton";
import {
  BACKGROUND_LIGHT,
  BORDER_PRIMARY,
  POPUP_LIGHT,
} from "../constants/colors";

import { STOCKS_DATA } from "../data/dummy_stocks";
import { currencyFormatter } from "../constants/formatter";

const StockDetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const stockData = STOCKS_DATA[id];

  useEffect(() => {
    navigation.setOptions({
      title: `${id} ${stockData.name}`,
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <HeaderButton
              onPress={() => {}}
              name="notifications-outline"
              containerStyle={styles.headerRight}
            />
            <HeaderButton
              onPress={() => {}}
              name="cart-outline"
              containerStyle={styles.headerRight}
            />
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: stockData.chartSrc }} style={styles.image} />
      </View>
      {/* TODO Proper stock details */}
      <View style={styles.detailsContainer}>
        <Text style={{fontSize: 20}}>Current Price: {currencyFormatter.format(stockData.price)}</Text>
        <Text>{ stockData.details}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 10,
  },
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: BACKGROUND_LIGHT,
  },
  imageContainer: {
    height: 250,
    width: "100%",
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    marginVertical: 10,
    padding: 10,
    width: "100%",
    flex: 1,
    backgroundColor: POPUP_LIGHT,
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: "scroll",
  },
});

export default StockDetailsScreen;
