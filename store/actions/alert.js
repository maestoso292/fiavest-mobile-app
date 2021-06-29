import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

export const ENABLE_ALERT = "ENABLE_ALERT";
export const DISABLE_ALERT = "DISABLE_ALERT";
export const SET_ALERT = "SET_ALERT";

export const enableAlert = (stockId, priceTarget, volumeTarget) => {
  return async (dispatch) => {
    // AsyncStorage.removeItem("alerts");
    const result = await dispatch({
      type: ENABLE_ALERT,
      stockId: stockId,
      priceTarget: priceTarget,
      volumeTarget: volumeTarget,
    });
    // TODO Following may be non-optimal
    // Save alerts to local storage

    const alertsData = await fetchAlertsFromLocal();
    let alerts;
    if (!alertsData) {
      alerts = {};
    } else {
      alerts = JSON.parse(alertsData);
    }

    alerts[stockId] = {
      stockId: stockId,
      priceTarget: priceTarget,
      volumeTarget: volumeTarget,
    };

    await AsyncStorage.setItem("alerts", JSON.stringify(alerts));

    const updated = await AsyncStorage.getItem("alerts");
    console.log("IN LOCAL");
    console.log(JSON.parse(updated));
  };
};

export const disableAlert = (stockId) => {
  return async (dispatch) => {
    const response = await dispatch({ type: DISABLE_ALERT, value: stockId });
    console.log(response);
  };
};

const fetchAlertsFromLocal = async () => {
  return await AsyncStorage.getItem("alerts");
};
