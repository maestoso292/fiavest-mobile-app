import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Animated,
  FlatList,
  Text,
} from "react-native";

import { BACKGROUND_LIGHT, POPUP_LIGHT } from "../constants/colors";
import ViewPopup from "../components/ViewPopup";
import FilterButton from "../components/stocks/FilterButton";
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
    console.log("Fade In: ");
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    console.log("Fade Out: ");
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const togglePopup = () => {
    setPopupVisible((prev) => !prev);
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

      <View
        style={styles.popupContainer}
        pointerEvents={popupVisible ? "box-none" : "none"}
      >
        <ViewPopup style={{ ...styles.popup, opacity: fadeAnim }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingLeft: 50,
            }}
          >
            <Text>Min</Text>
            <Text>Max</Text>
          </View>
          <Button title="Save" onPress={togglePopup} />
        </ViewPopup>
      </View>
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
  popupContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "70%",
    height: "30%",
    borderRadius: 25,
    backgroundColor: POPUP_LIGHT,
    overflow: "hidden",
  },
});

export default StocksScreen;
