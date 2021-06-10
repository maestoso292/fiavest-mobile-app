import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AdSlideShow from "../components/AdSlideshow";
import StockEntry from "../components/StockEntry";

const renderStockListItem = ({ item }) => {
  return <StockEntry name={item.name} source={item.source} />;
};

// TODO Fetching data of all stocks
const fetchData = () => {
  const data = [
    {
      id: "MXM100",
      name: "Stock Name",
      source: "https://cdn.logo.com/hotlink-ok/logo-social.png",
    },
    {
      id: "MXM101",
      name: "Stock Name",
      source: "https://cdn.logo.com/hotlink-ok/logo-social.png",
    },
    {
      id: "MXM102",
      name: "Stock Name",
      source: "https://cdn.logo.com/hotlink-ok/logo-social.png",
      },
    {
      id: "MXM103",
      name: "Stock Name",
      source: "https://cdn.logo.com/hotlink-ok/logo-social.png",
    },
  ];
  return data;
};

const HomeScreen = (props) => {
  const [stocks, setStocks] = useState(fetchData());
  return (
    <View style={styles.screen}>
      <AdSlideShow />
      <View style={styles.listContainer}>
        <FlatList
          data={stocks}
          renderItem={renderStockListItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
        width: "100%",
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "90%",
    paddingVertical: 10,
  },
  list: {
    flexGrow: 1,
  },
});

export default HomeScreen;
