import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import "intl";
import "intl/locale-data/jsonp/en";

import Container from "../components/Portfolio-Conn";
import Button2 from "../components/Button2";
import SellPopUp from "../components/SellPopUp";
import {
  BACKGROUND_LIGHT,
  BORDER_PRIMARY,
  POPUP_LIGHT,
} from "../constants/colors";

const renderStock = ({ item }) => {
  return (
    <Container
      name={item.name}
      lots={item.lots}
      price={formatter.format(item.price).replace(/[^0123456789.,]/g, "")}
    />
  );
};

const fetchStockData = () => {
    const data = [
        {
            id: "1",
            name: '1155 MAYBANK',
            lots: '10',
            price: '81.8'
        },
        {
            id: "2",
            name: '5099 AIRASIA',
            lots: '100',
            price: '92'
        },
        {
            id: "3",
            name: '7079 TIGER',
            lots: '1000',
            price: '55'
        },
        {
            id: "4",
            name: '0001 SCOMNET',
            lots: '100',
            price: '163'
        },
    ];
    return data;
};

const formatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "MYR",
});

const PortfolioScreen = (props) => {
  const [stocks, setStocks] = useState(fetchStockData());
  const [totalAmount, setTotalAmount] = useState(100.65);
  const [popupVisible, setPopupVisible] = useState(false);

  const closePopup = () => {
    setPopupVisible(false);
  };

  const openPopup = () => {
    setPopupVisible(true);
  };

  return (
    <View style={styles.screen}>
      <SellPopUp
        visible={popupVisible}
        onClose={closePopup}
        animationType="fade"
      />
      <View style={styles.header}>
        <View style={{ ...styles.headerItem, flex: 4 }}>
          <Text>ID & Name</Text>
        </View>
        <View style={{ ...styles.headerItem, flex: 2 }}>
          <Text>Lot (x100)</Text>
        </View>
        <View style={{ ...styles.headerItem, flex: 3 }}>
          <Text>Price (RM)</Text>
        </View>
        <View style={{ ...styles.headerItem, flex: 1, borderEndWidth: 0 }}>
          <Text>Sell</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          data={stocks}
          keyExtractor={(item) => item.id}
          renderItem={renderStock}
        />
      </View>
      <View style={styles.totalContainer}>
        <View>
          <Text style={{ fontSize: 20 }}>
            Total : RM{" "}
            <Text style={{ fontWeight: "bold" }}>
              {formatter.format(totalAmount).replace(/[^0123456789.,]/g, "")}
            </Text>
          </Text>
        </View>
        <Button2 onPress={openPopup}>SELL</Button2>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: BACKGROUND_LIGHT,
  },
  header: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    borderColor: BORDER_PRIMARY,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 2,
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: POPUP_LIGHT,
  },
  headerItem: {
    borderColor: BORDER_PRIMARY,
    borderEndWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: POPUP_LIGHT,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_PRIMARY,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    width: "100%",
    height: 60,
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  list: {
    flexGrow: 1,
  },
});

export default PortfolioScreen;