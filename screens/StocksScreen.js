import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Button, Animated, FlatList, Text } from "react-native";
import { BACKGROUND_LIGHT, POPUP_LIGHT } from "../constants/colors";
import ViewPopup from "../components/ViewPopup";
import FilterButton from "../components/stocks/FilterButton";
import StockEntry from "../components/stocks/StockEntry";

const fetchStocks = () => {
  const data = [
    { id: "0000", text: "Sample Text" },
    { id: "0001", text: "Sample Text" },
    { id: "0002", text: "Sample Text" },
    { id: "0003", text: "Sample Text" },
  ];
  return data;
};

const renderStockEntry = ({ item }) => {
  return <StockEntry text={item.text} />;
};

const StocksScreen = ({ navigation }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    console.log("Fade In: " + popupVisible);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    console.log("Fade Out: " + popupVisible);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <FilterButton
            onPress={() => setPopupVisible((prevValue) => !prevValue)}
          />
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    popupVisible ? fadeIn() : fadeOut();
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

      <View style={styles.popupContainer}>
        <ViewPopup style={{ ...styles.popup, opacity: fadeAnim }}>
          <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingLeft: 50}}>
            <Text>Min</Text>
            <Text>Max</Text>
          </View>
          <Button title="Save" onPress={() => setPopupVisible(false)} />
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
