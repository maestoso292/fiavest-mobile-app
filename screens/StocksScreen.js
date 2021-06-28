import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Animated, FlatList, Keyboard } from "react-native";

import {
  BACKGROUND_LIGHT,
  BORDER_PRIMARY,
  POPUP_LIGHT,
} from "../constants/colors";
import HeaderButton from "../components/base/HeaderButton";
import FilterPopup from "../components/stocks/FilterPopup";
import StockEntry from "../components/stocks/StockEntry";
import { STOCKS_DATA } from "../data/dummy_stocks";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { fade } from "../animations/popup-anims";

const fetchStocks = () => {
  const data = Object.values(STOCKS_DATA);
  return data;
};

const renderStockEntry = ({ item }) => {
  return <StockEntry id={item.id} name={item.name} price={item.price} />;
};

const StocksScreen = ({ navigation }) => {
  const route = useRoute();

  const [popupVisible, setPopupVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const unfilteredData = fetchStocks();
  const [data, setData] = useState(unfilteredData);
  const [search, setSearch] = useState();

  const togglePopup = () => {
    Keyboard.dismiss();
    setPopupVisible((prev) => !prev);
  };

  const submitHandler = (filters) => {
    console.log(filters);
    Keyboard.dismiss();
    setPopupVisible(false);
  };

  const searchFilter = (query) => {
    const newData = unfilteredData.filter((item) => {
      const itemData = `${item.id.toUpperCase()} ${item.name.toUpperCase()}`;
      const queryData = query.toUpperCase();

      return itemData.indexOf(queryData) > -1;
    });
    setSearch(query);
    setData(newData);
  };

  // TODO Decide whether to do this onFocus or onBlur
  useFocusEffect(useCallback(() => {
    setPopupVisible(false);
    setSearch(null);
    setData(unfilteredData);
  },[setPopupVisible, setSearch]));

  useEffect(() => {
    let endValue = popupVisible ? 1 : 0;
    fade(fadeAnim, endValue).start();
  }, [popupVisible]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="menu-outline"
            onPress={() => {
              navigation.navigate("Menu", { current: route.name });
            }}
            containerStyle={{ paddingLeft: 10 }}
          />
        );
      },
      headerRight: () => {
        return (
          <HeaderButton
            onPress={togglePopup}
            name="options-outline"
            containerStyle={{ paddingRight: 10 }}
          />
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <SearchBar
            placeholder="Search..."
            onFocus={() => setPopupVisible(false)}
            onChangeText={searchFilter}
            autoCorrect={false}
            value={search}
            round
            cancelIcon={false}
            cancelButtonProps={{
              disabled: true,
              buttonDisabledStyle: {
                width: 0,
              },
            }}
            showCancel={false}
            inputContainerStyle={styles.searchBar}
            containerStyle={styles.searchBarContainer}
          />
        );
      },
    });
  }, [navigation, search]);

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
  searchBarContainer: {
    flex: 1,
    alignSelf: "baseline",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER_PRIMARY,
    borderBottomWidth: 1,
    borderRadius: 25,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: POPUP_LIGHT,
  },
  listContainer: {
    flex: 1,
    width: "90%",
  },
  list: {
    flexGrow: 1,
    marginVertical: 5
  },
});

export default StocksScreen;
