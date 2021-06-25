import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import HeaderButton from "../components/base/HeaderButton";
import CartPopup from "../components/stock-details/CartPopup";

import {
  BACKGROUND_LIGHT,
  BORDER_PRIMARY,
  POPUP_LIGHT,
} from "../constants/colors";

import { STOCKS_DATA } from "../data/dummy_stocks";
import { currencyFormatter } from "../constants/formatter";
import { fade } from "../animations/popup-anims";
import AlertPopup from "../components/stock-details/AlertPopup";
import FilterPopup from "../components/stocks/FilterPopup";

const StockDetailsScreen = ({ navigation, route }) => {
  const [cartPopupVisible, setCartPopupVisible] = useState(false);
  const [alertPopupVisible, setAlertPopupVisible] = useState(false);

  const cartFadeValue = useRef(new Animated.Value(0)).current;
  const alertFadeValue = useRef(new Animated.Value(0)).current;

  const { id } = route.params;
  const stockData = STOCKS_DATA[id];

  const toggleCartPopup = () => {
    Keyboard.dismiss();
    setAlertPopupVisible(false);
    setCartPopupVisible((prev) => !prev);
  };

  const toggleAlertPopup = () => {
    Keyboard.dismiss();
    setCartPopupVisible(false);
    setAlertPopupVisible((prev) => !prev);
  };

  const alertSubmitHandler = (priceTarget, volumeTarget) => {
    console.log(`Price: ${priceTarget} --- Volume: ${volumeTarget}`);
    toggleAlertPopup();
  };

  useEffect(() => {
    let endValue = cartPopupVisible ? 1 : 0;
    fade(cartFadeValue, endValue).start();
  }, [cartPopupVisible, fade]);

  useEffect(() => {
    let endValue = alertPopupVisible ? 1 : 0;
    fade(alertFadeValue, endValue).start();
  }, [alertPopupVisible, fade]);

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
              onPress={toggleAlertPopup}
              name="notifications-outline"
              containerStyle={styles.headerRight}
            />
            <HeaderButton
              onPress={toggleCartPopup}
              name="cart-outline"
              containerStyle={styles.headerRight}
            />
          </View>
        );
      },
    });
  }, [navigation, id, stockData.name]);

  return (
    <View style={styles.screen} behavior="height">
      <View style={styles.imageContainer}>
        <Image source={{ uri: stockData.chartSrc }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={{ fontSize: 20 }}>
          Current Price: {currencyFormatter.format(stockData.price)}
        </Text>
        <Text>{stockData.details}</Text>
      </View>
      <CartPopup
        visible={cartPopupVisible}
        popupStyle={{ opacity: cartFadeValue }}
        // To be a screen overlay, elevation must be higher than elevation of other components
        containerStyle={{ elevation: 2, zIndex: 2 }}
      />
      <AlertPopup
        visible={alertPopupVisible}
        popupStyle={{ opacity: alertFadeValue }}
        // To be a screen overlay, elevation must be >= elevation of other components
        containerStyle={{ elevation: 2, zIndex: 2 }}
        onCancel={toggleAlertPopup}
        onSubmit={alertSubmitHandler}
      />
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
    backgroundColor: POPUP_LIGHT,
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    overflow: "scroll",
  },
});

export default StockDetailsScreen;
