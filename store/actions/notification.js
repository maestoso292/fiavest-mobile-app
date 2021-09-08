import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notification from "expo-notifications";

const getTokenForPushNotification = async () => {
    if (Constants.isDevice) {
      const {status : existingStatus} = await Notification.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const {status} = await Notification.requestPermissionsAsync();
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        console.log("Failed get token for notification");
        return;
      }
      const token = (await Notification.getExpoPushTokenAsync()).data;
      console.log(token);
      const tokenData = await AsyncStorage.getItem("tokenPermission")
      const tokenJson = await JSON.parse(tokenData)
      if (tokenJson.token !== "") {
          saveTokenToLocal(token)
      } else if (tokenJson.token !== token) {
          await AsyncStorage.removeItem("tokenPermission").then(
              () => {
                saveTokenToLocal(token)
              }
          )
      }
    } else {
      console.log("Not Physical Devices");
    }
    return token;

};

export const addExpoToken = () => {
    return async (dispatch) => {
        const userData = await AsyncStorage.getItem("userData");
        const jsonData = await JSON.parse(userData);
        // console.log(jsonData);

        const getToken = await getTokenForPushNotification();
        console.log(getToken);

        // const resp = await fetch(
        //     "https://fiavest-plus-app-api.fiavest.com/api/private/notifications/add-push-token",
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             sessionId: jsonData.sessionId,
        //         },
        //         body: JSON.stringify({
        //             expoPushToken: token
        //         })
        //     }
        // );

        // if (!resp.ok) {
        //     const errorResData = await resp.json();
        //     const errorID = errorResData.error.message;
        //     let message = `Something went wrong : ${errorID}`;
        //     console.log(message);
        // }

    }
}

const saveTokenToLocal = async (
    token,
) => {
    AsyncStorage.setItem(
        "tokenPermission",
        JSON.stringify({
            token: token
        })
    ).catch((e) => console.log(e));
};