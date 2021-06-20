import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { firebase } from "@react-native-firebase/auth";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const DID_AUTO_LOGIN = "DID_AUTO_LOGIN";

export const LOGIN_METHODS = {
  EMAIL: "email",
  FACEBOOK: "facebook",
  GOOGLE: "google",
};

export const setDidAutoLogin = () => {
  return (dispatch) => {
    dispatch({ type: DID_AUTO_LOGIN });
  };
};

export const authenticate = (userId, token, expiryDate) => {
  return (dispatch) => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      expiryDate: expiryDate,
    });
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

      saveDataToLocal(
        token,
        userId,
        expirationDate.getMilliseconds(),
        null,
        LOGIN_METHODS.FACEBOOK
      );
      dispatch(
        authenticate(
          userId,
          token,
          expirationDate.getMilliseconds(),
          LOGIN_METHODS.FACEBOOK
        )
      );
    } else {
      console.log("Cancel");
    }
  } catch (e) {
    console.log(`Facebook Login Error : ${e}`);
  }
};

export const autoLoginViaFacebook = async (dispatch) => {
  try {
    const response = await Facebook.getAuthenticationCredentialAsync();

    dispatch(
      authenticate(
        response.userId,
        response.token,
        response.expirationDate.getMilliseconds(),
        LOGIN_METHODS.FACEBOOK
      )
    );
  } catch (err) {
    console.log(err);
    dispatch(setDidAutoLogin);
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

    if (result.type === "success") {
      saveDataToLocal(
        result.accessToken,
        result.user.id,
        0,
        result.refreshToken,
        LOGIN_METHODS.GOOGLE
      );
      dispatch(
        authenticate(
          result.idToken,
          result.accessToken,
          0,
          LOGIN_METHODS.GOOGLE
        )
      );
    } else {
      return { cancel: true };
    }
  } catch (e) {
    throw new Error("Login error. Please try again later.");
  }
};

// TODO Might not be possible with Expo Go
export const autoLoginViaGoogle = (refreshToken) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://securetoken.googleapis.com/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      let message = "Something wrong";
      if (errorID === "EMAIL_EXISTS") {
        message = "This email exist already!";
      }
      throw new Error(message + errorID);
    }

    const responseData = await response.json();

    const expirationDate = new Date(
      Date.now() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToLocal(
      responseData.access_token,
      "",
      expirationDate.getMilliseconds(),
      responseData.refresh_token,
      LOGIN_METHODS.GOOGLE
    );

    dispatch(
      authenticate(
        "",
        responseData.access_token,
        expirationDate.getMilliseconds(),
        LOGIN_METHODS.GOOGLE
      )
    );
  };
};

//(email, password) add more info inside this bracket
export const registerViaEmail = (
  email,
  password,
  username,
  address,
  phone,
  brokingHouse,
  term,
  experience
) => {
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
        message = "This email is already in use by another account";
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    const expirationDate = new Date(
      Date.now() + parseInt(responseData.expiresIn) * 1000
    );

    // console.log(`Expiration date of token: ${expirationDate}`);

    saveDataToLocal(
      responseData.token,
      responseData.localId,
      expirationDate,
      responseData.refreshToken,
      LOGIN_METHODS.EMAIL
    );

    dispatch(
      writeUserDataToDB(
        responseData.localId,
        username,
        email,
        address,
        phone,
        brokingHouse,
        term,
        experience
      )
    );

    dispatch(
      authenticate(
        responseData.localId,
        responseData.token,
        expirationDate,
        LOGIN_METHODS.EMAIL
      )
    );
  };
};

export const loginViaEmail = (email, password) => {
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
      let message = `Something went wrong: ${errorID}`;
      console.log(message);
      if (errorID === "EMAIL_NOT_FOUND" || errorID === "INVALID_PASSWORD") {
        message = "Invalid credentials";
      } else if (errorID === "USER_DISABLED") {
        message = "Account has been disabled. Please contact support.";
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    const expirationDate = new Date(
      Date.now() + parseInt(responseData.expiresIn) * 1000
    );

    // console.log(`Expiration date of token: ${expirationDate}`);

    saveDataToLocal(
      responseData.idToken,
      responseData.localId,
      expirationDate,
      responseData.refreshToken,
      LOGIN_METHODS.EMAIL
    );

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        expirationDate,
        LOGIN_METHODS.EMAIL
      )
    );
  };
};

export const refreshTokenEmail = (refreshToken) => {
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
      Date.now() + parseInt(responseData.expires_in) * 1000
    );

    // console.log(`Expiration date of token: ${expirationDate}`);

    saveDataToLocal(
      responseData.id_token,
      responseData.user_id,
      expirationDate.getMilliseconds,
      responseData.refresh_token,
      LOGIN_METHODS.EMAIL
    );

    dispatch(
      authenticate(
        responseData.user_id,
        responseData.id_token,
        expirationDate.getMilliseconds(),
        LOGIN_METHODS.EMAIL
      )
    );
  };
};

export const writeUserDataToDB = (
  uid,
  username,
  email,
  address,
  phone,
  brokingHouse,
  term,
  experience
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://fiavest-tempo-default-rtdb.firebaseio.com/users/${uid}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          address,
          phone,
          brokingHouse,
          term,
          experience,
        }),
      }
    );
  };
};

// TODO Proper logout required (Invalidating access tokens)
export const logout = () => {
  AsyncStorage.removeItem("userData");
  try {
    Facebook.logOutAsync();
  } catch (err) {
    console.log(err);
  }
  return { type: LOGOUT };
};

const saveDataToLocal = async (
  token,
  userId,
  expiryDate,
  refreshToken,
  method
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expiryDate,
      refreshToken: refreshToken,
      method: method,
    })
  ).catch((e) => console.log(e));
};
