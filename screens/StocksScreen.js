import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  Keyboard,
  RefreshControl
} from "react-native";

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
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetAlertPopUp, DisableAlertPopUp } from "../components/stocks/PopUpAlert";
import { disableAlert, enableAlert } from "../store/actions/alert";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const fetchStocks = () => {
  const data = Object.values(STOCKS_DATA);
  return data;
};

const StocksScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const [refreshing, setRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const unfilteredData = fetchStocks();
  const [data, setData] = useState(unfilteredData);
  const [search, setSearch] = useState();

  const [enablePopupVisible, setEnablePopupVisible] = useState(false)
  const [disablePopupVisible, setDisablePopupVisible] = useState(false)
  const [selectedId, setSelectedId] = useState()
  const [selectedName, setSelectedName] = useState()
  const [alertInfo, setAlertInfo] = useState()

  const alertEnableFadeValue = useRef(new Animated.Value(0)).current;
  const alertDisableFadeValue = useRef(new Animated.Value(0)).current;

  const alerts = useSelector((state) => state.alert.alertEnabledStocks);
  const alertForId = useSelector((state) => state.alert.alertEnabledStocks[selectedId]);
  

  // TODO Temporary debug statement. Remove at a later date.
  useEffect(() => {
    console.log("IN STORE");
    console.log(alerts);
  }, [alerts]);

  useEffect(() => {
    if (alertForId) setAlertInfo(alertForId)
  }, [alertForId, selectedId])

  const searchFilter = (query) => {
    const newData = unfilteredData.filter((item) => {
      const itemData = `${item.id.toUpperCase()} ${item.name.toUpperCase()}`;
      const queryData = query.toUpperCase();

      return itemData.indexOf(queryData) > -1;
    });
    setSearch(query);
    setData(newData);
  };

  // All Action about Alert Pop Up

  const PopUpHandler = async (id, name) => {
    setSelectedId(id)
    setSelectedName(name)
    if (alertInfo.priceTarget === null || alertInfo.volumeTarget) {
      setEnablePopupVisible(true)
      setDisablePopupVisible(false)
    } else {
      setDisablePopupVisible(false)
      setEnablePopupVisible(false)
    }
    // if (alert === undefined) {
    //   setEnablePopupVisible(true)
    // } else {
    //   setDisablePopupVisible(false)
    // }
  }

  const EnablePopupAction = () => {
    Keyboard.dismiss();
    setDisablePopupVisible(false)
    setSelectedId(null)
    setEnablePopupVisible((prev) => !prev);
  }

  const DisablePopupAction = () => {
    Keyboard.dismiss();
    setEnablePopupVisible(false)
    setSelectedId(null)
    setDisablePopupVisible((prev) => !prev)
  }

  const SetAlertHandler = (priceTarget, VolumeTarget) => {
    if (priceTarget === null || VolumeTarget === null) {
      alert("Empty spaces")
    } else {
      console.log(`Price: ${priceTarget} --- Volume: ${VolumeTarget}`);
      dispatch(enableAlert(selectedId, priceTarget, VolumeTarget));
    }
    EnablePopupAction();
  };

  const DisableAlertHandler = () => {
    try {
      dispatch(disableAlert(selectedId));
    } catch (err) {
      console.log(err);
    }
    DisablePopupAction();
  };

  useEffect(() => {
    let endValue = enablePopupVisible ? 1 : 0;
    fade(alertEnableFadeValue, endValue).start();
  }, [enablePopupVisible, fade]);

  useEffect(() => {
    let endValue = disablePopupVisible ? 1 : 0;
    fade(alertDisableFadeValue, endValue).start();
  }, [disablePopupVisible, fade]);

  // TODO Decide whether to do this onFocus or onBlur
  useFocusEffect(
    useCallback(() => {
      setSearch(null);
      setData(unfilteredData);
    }, [setSearch])
  );

  const RefreshHandler = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])
  
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
        <View style={styles.header}>
          <View style={{ ...styles.headerItem, flex: 2 }}>
            <Text style={styles.headerText}>ID</Text>
          </View>
          <View style={{ ...styles.headerItem, flex: 2 }}>
            <Text style={styles.headerText}>Name</Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => {
            return <StockEntry 
            id={item.id} 
            name={item.name}
            onPress={() => PopUpHandler(item.id, item.name)}
            />;
          }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={RefreshHandler}
            />
          }
        />
      </View>
      <SetAlertPopUp 
        visible={enablePopupVisible}
        popupStyle={{ opacity: alertEnableFadeValue }}
        containerStyle={{ elevation: 2, zIndex: 2 }}
        onCancel={EnablePopupAction}
        onSubmit={SetAlertHandler}
        stockId={selectedId}
        stockName={selectedName}
      />
      <DisableAlertPopUp 
        visible={disablePopupVisible}
        popupStyle={{ opacity: alertDisableFadeValue }}
        containerStyle={{ elevation: 2, zIndex: 2 }}
        onSubmit={DisableAlertHandler}
        onCancel={DisablePopupAction}
        stockId={selectedId}
        stockName={selectedName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
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
  header: {
    borderWidth: 2,
    borderColor: BORDER_PRIMARY,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 2,
    height: "7%",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: POPUP_LIGHT,
  },
  headerItem: {
    borderColor: BORDER_PRIMARY,
    borderEndWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242424"
  },
  headerText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  },
  listContainer: {
    flex: 1,
    width: "90%",
    paddingVertical: 10,
  },
  list: {
    flexGrow: 1,
    marginVertical: 5,
  },
});

export default StocksScreen;
