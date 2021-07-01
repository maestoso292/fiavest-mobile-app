import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  Keyboard,
} from "react-native";

import HeaderButton from "../components/base/HeaderButton";
import CartPopup from "../components/stock-details/CartPopup";
import AlertEnablePopup from "../components/stock-details/AlertEnablePopup";

import {
  BACKGROUND_LIGHT,
  BORDER_PRIMARY,
  POPUP_LIGHT,
} from "../constants/colors";

import { STOCKS_DATA } from "../data/dummy_stocks";
import { currencyFormatter } from "../constants/formatter";
import { fade } from "../animations/popup-anims";
import { useDispatch, useSelector } from "react-redux";
import { disableAlert, enableAlert } from "../store/actions/alert";
import AlertDisablePopup from "../components/stock-details/AlertDisablePopup";

const fadeAnim = (state, value, endValue) => {};

const StockDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [cartVisible, setCartVisible] = useState(false);
  const [alertEnableVisible, setAlertEnableVisible] = useState(false);
  const [alertDisableVisible, setDisableVisible] = useState(false);

  const cartFadeValue = useRef(new Animated.Value(0)).current;
  const alertEnableFadeValue = useRef(new Animated.Value(0)).current;
  const alertDisableFadeValue = useRef(new Animated.Value(0)).current;

  const { id } = route.params;
  const stockData = STOCKS_DATA[id];
  const alert = useSelector((state) => state.alert.alertEnabledStocks[id]);

  const toggleAlertEnablePopup = () => {
    Keyboard.dismiss();
    setDisableVisible(false);
    setCartVisible(false);
    setAlertEnableVisible((prev) => !prev);
  };

  const toggleAlertDisablePopup = () => {
    Keyboard.dismiss();
    setAlertEnableVisible(false);
    setCartVisible(false);
    setDisableVisible((prev) => !prev);
  };

  const toggleCartPopup = () => {
    Keyboard.dismiss();
    setAlertEnableVisible(false);
    setDisableVisible(false);
    setCartVisible((prev) => !prev);
  };

  const alertEnableSubmitHandler = (priceTarget, volumeTarget) => {
    console.log(`Price: ${priceTarget} --- Volume: ${volumeTarget}`);
    dispatch(enableAlert(id, priceTarget, volumeTarget));
    toggleAlertEnablePopup();
  };

  const alertDisableSubmitHandler = () => {
    try {
      dispatch(disableAlert(id));
    } catch (err) {
      console.log(err);
    }
    toggleAlertDisablePopup();
  };

  const cartSubmitHandler = (broker, lot, total, payment) => {
    console.log(
      `Broker: ${broker} --- Lot: ${lot} --- Total: ${total} --- Payment: ${payment}`
    );
    toggleCartPopup();
  };

  useEffect(() => {
    let endValue = cartVisible ? 1 : 0;
    fade(cartFadeValue, endValue).start();
  }, [cartVisible, fade]);

  useEffect(() => {
    let endValue = alertEnableVisible ? 1 : 0;
    fade(alertEnableFadeValue, endValue).start();
  }, [alertEnableVisible, fade]);

  useEffect(() => {
    let endValue = alertDisableVisible ? 1 : 0;
    fade(alertDisableFadeValue, endValue).start();
  }, [alertDisableVisible, fade]);

  // TODO Temporary debug statement. Remove at a later date.
  useEffect(() => {
    console.log(`ALERT FOR ${id}`);
    console.log(alert);
  }, [alert]);

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
            {alert && (
              <HeaderButton
                onPress={toggleAlertDisablePopup}
                name="notifications-off-outline"
                containerStyle={styles.headerRight}
              />
            )}
            {!alert && (
              <HeaderButton
                onPress={toggleAlertEnablePopup}
                name="notifications-outline"
                containerStyle={styles.headerRight}
              />
            )}
            <HeaderButton
              onPress={toggleCartPopup}
              name="cart-outline"
              containerStyle={styles.headerRight}
            />
          </View>
        );
      },
    });
  }, [navigation, id, alert, stockData.name]);

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
        visible={cartVisible}
        popupStyle={{ opacity: cartFadeValue }}
        // To be a screen overlay, elevation must be higher than elevation of other components
        containerStyle={{ elevation: 2, zIndex: 2 }}
        onSubmit={cartSubmitHandler}
      />
      <AlertEnablePopup
        visible={alertEnableVisible}
        popupStyle={{ opacity: alertEnableFadeValue }}
        // To be a screen overlay, elevation must be >= elevation of other components
        containerStyle={{ elevation: 2, zIndex: 2 }}
        onCancel={toggleAlertEnablePopup}
        onSubmit={alertEnableSubmitHandler}
      />
      <AlertDisablePopup
        visible={alertDisableVisible}
        popupStyle={{ opacity: alertDisableFadeValue }}
        // To be a screen overlay, elevation must be >= elevation of other components
        containerStyle={{ elevation: 2, zIndex: 2 }}
        onCancel={toggleAlertDisablePopup}
        onSubmit={alertDisableSubmitHandler}
        stockId={id}
        stockName={stockData.name}
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
