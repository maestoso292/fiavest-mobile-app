import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Animated,
  FlatList,
  Text,
  Keyboard,
} from "react-native";

import { BACKGROUND_LIGHT, POPUP_LIGHT } from "../constants/colors";
import ViewPopup from "../components/ViewPopup";
import FilterButton from "../components/stocks/FilterButton";
import FilterPopup from "../components/stocks/FilterPopup";
import StockEntry from "../components/stocks/StockEntry";

const fetchStocks = () => {
  const data = [
    { id: "0000", name: "Sample Text", price: "$100" },
    { id: "0001", name: "Sample Text", price: "$100" },
    { id: "0002", name: "Sample Text", price: "$100" },
    { id: "0003", name: "Sample Text", price: "$100" },
    { id: "0005", name: "Sample Text", price: "$100" },
    { id: "0006", name: "Sample Text", price: "$100" },
    { id: "0007", name: "Sample Text", price: "$100" },
    { id: "0008", name: "Sample Text", price: "$100" },
  ];
  return data;
};

const renderStockEntry = ({ item }) => {
  return <StockEntry id={item.id} name={item.name} price={item.price} />;
};

const StocksScreen = ({ navigation }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // console.log("Fade In: ");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // console.log("Fade Out: ");
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  const submitHandler = (filters) => {
    console.log(filters);
    Keyboard.dismiss();
    setPopupVisible(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <FilterButton onPress={togglePopup} />;
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (popupVisible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [popupVisible]);

  const data = fetchStocks();

  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderStockEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>

      <FilterPopup
        visible={popupVisible}
        popupStyle={{ opacity: fadeAnim }}
        onSubmit={submitHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_LIGHT,
  },
  listContainer: {
    flex: 1,
    width: "90%",
  },
  list: {
    flexGrow: 1,
  },
});

export default StocksScreen;
