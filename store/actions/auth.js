import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { firebase } from "@react-native-firebase/auth";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const DID_AUTO_LOGIN = "DID_AUTO_LOGIN";

export const setDidAutoLogin = () => {
  return (dispatch) => {
    dispatch({ type: DID_AUTO_LOGIN });
  };
};

export const authenticate = (userId, token, expiryTime, method) => {
  return (dispatch) => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      expiryTime: expiryTime,
    });
  };
};

export const initFacebook = async (dispatch) => {
  return async (dispatch) => {
    try {
      const response = await Facebook.initializeAsync({
        appId: "484772439271129",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginViaFacebook = async (dispatch) => {
  try {
    const {
      type,
      userId,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      const responseData = await response.json();
      console.log(responseData);
      saveDataToLocal(token, userId, expirationDate, null, "facebook");
      dispatch(authenticate(userId, token, expirationDate.toISOString()));
    } else {
      console.log("Cancel");
    }
  } catch (e) {
    console.log(`Facebook Login Error : ${e}`);
  }
};

export const loginViaGoogle = async (dispatch) => {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "950808968576-mnhc5gcaqt787o33ccukn1bfvch8pepe.apps.googleusercontent.com",
      iosClientId:
        "950808968576-ufc28236nnhdh3ickcv8beugfd43do5m.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
    console.log(result);
    if (result.type === "success") {
      saveDataToLocal(
        result.accessToken,
        result.user.id,
        "",
        result.refreshToken,
        "google"
      );
      dispatch(authenticate(result.idToken, result.accessToken, ""));
    } else {
      return { cancel: true };
    }
  } catch (e) {
    return { error: true };
  }
};

//(email, password) add more info inside this bracket
export const register = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJDYVoRRinh626T1wLJh6MI6sCl7YZ5BM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      let message = "Something wrong";
      if (errorID === "EMAIL_EXISTS") {
        message = "This email exist already!";
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    const miliSecondDate = expirationDate.setSeconds(
      new Date().getSeconds() + parseInt(responseData.expiresIn)
    );

    saveDataToLocal(
      responseData.token,
      responseData.localId,
      miliSecondDate,
      responseData.refreshToken,
      "email"
    );

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJDYVoRRinh626T1wLJh6MI6sCl7YZ5BM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      let message = "Something wrong";
      if (errorID === "EMAIL_NOT_FOUND") {
        message = "This email cant be found!";
      } else if (errorID === "USER_DISABLED") {
        message = "User disable";
      } else if (errorID === "INVALID_PASSWORD") {
        message = "Password Problem";
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn)
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    //const currentTime = new Date( new Date().getTime());
    //const currentMili = currentTime.setSeconds(new Date().getSeconds());

    const miliSecondDate = expirationDate.setSeconds(
      new Date().getSeconds() + parseInt(responseData.expiresIn)
    );

    //const diff = ((miliSecondFormat - currentMili) / 3600).toFixed(0);

    console.log(miliSecondDate);
    //console.log(expirationDate);
    //console.log(currentTime);
    //console.log(diff);

    saveDataToLocal(
      responseData.idToken,
      responseData.localId,
      miliSecondDate,
      responseData.refreshToken,
      "email"
    );
  };
};

export const refreshToken = (refreshToken) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyAJDYVoRRinh626T1wLJh6MI6sCl7YZ5BM",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      let message = `Something wrong: ${errorID}`;
      if (errorID === "TOKEN_EXPIRED") {
        message = "Token Expired";
      } else if (errorID === "INVALID_REFRESH_TOKEN") {
        message = "Refresh token invalid";
      } else if (errorID === "INVALID_GRANT_TYPE") {
        message = "Password Problem";
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    const miliSecondDate = expirationDate.setSeconds(
      new Date().getSeconds() + parseInt(responseData.expiresIn)
    );

    dispatch(
      authenticate(
        responseData.userId,
        responseData.id_token,
        miliSecondDate,
        "email"
      )
    );
    console.log(responseData);
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  try {
    Facebook.logOutAsync();
  } catch (err) {
    console.log(err);
  }
  return { type: LOGOUT };
};

const saveDataToLocal = async (token, userId, miliSecondDate, refreshToken,method) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: miliSecondDate,
      refreshToken: refreshToken,
      method: method,
    })
  ).catch((e) => console.log(e));
};
