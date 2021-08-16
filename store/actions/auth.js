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

export const authenticate = (userId, token) => {
  return (dispatch) => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const loginViaFacebook = async (dispatch) => {
  try {
    const {
      type,
      userId,
      token,
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
        null,
        LOGIN_METHODS.FACEBOOK
      );
      dispatch(
        authenticate(
          userId,
          token,
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

    saveDataToLocal(
      responseData.access_token,
      "",
      responseData.refresh_token,
      LOGIN_METHODS.GOOGLE
    );

    dispatch(
      authenticate(
        "",
        responseData.access_token,
        LOGIN_METHODS.GOOGLE
      )
    );
  };
};

export const registerViaEmail = (
  email,
  password,
  nameGiven,
  nameFamily,
  phoneNum,
  address,
  brokingHouse,
  investmentTerm,
  tradingExp,
  actiCode,
) => {
  return async (dispatch) => {
    if (actiCode === "") actiCode = null
    const response = await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/public/register/new-via-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          code: actiCode,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      // console.log(errorResData);
      const errorID = errorResData.error.message;
      console.log(errorID);
      let message = "Please Double Check The Form";
      if (errorID === "Invalid email") {
        message = "Email Invalid";
      } else if (errorID === "Email already registered") {
        message = "Email Registered"
      }
      throw new Error(message);
    }

    const responseData = await response.json();
    // console.log(responseData);

    await dispatch(loginViaEmail(email, password))
    
    const userData = await AsyncStorage.getItem("userData")
    const jsonData = JSON.parse(userData)
    // console.log(jsonData);

    dispatch(writeUserDataToDB(
          jsonData.token,
          responseData.uuid,
          nameGiven,
          nameFamily,
          phoneNum,
          address,
          brokingHouse,
          investmentTerm,
          tradingExp
        )
      );
  };
};

export const loginViaEmail = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/public/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          channel: "W",
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      let message = `Something went wrong: ${errorID}`;
      console.log(errorResData);
      if (errorID === "EMAIL_NOT_FOUND" || errorID === "INVALID_PASSWORD") {
        message = "Invalid credentials";
      } else if (errorID === "USER_DISABLED") {
        message = "Account has been disabled. Please contact support.";
      }
      throw new Error(message);
    }

    const responseData = await response.json();
    // console.log(responseData);

    saveDataToLocal(
      responseData.sessionId,
      responseData.uuid,
      LOGIN_METHODS.EMAIL,
    )
    dispatch(
      authenticate(
        responseData.uuid,
        responseData.sessionId
      )
    )
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/public/reset-password/request-via-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          url: "http://localhost:3000/resetPass"
        }),
      }
    );

      if(!response.ok) {
        const errorResData = await response.json();
        const errorID = errorResData.error.message;
        let message = `Something went wrong: ${errorID}`;
        console.log(errorResData);
        if (errorID === "EMAIL_NOT_FOUND" || errorID === "INVALID_PASSWORD") {
          message = "Invalid credentials";
        } else if (errorID === "USER_DISABLED") {
          message = "Account has been disabled. Please contact support.";
        }
        throw new Error(message);
      }

  }
}

export const writeUserDataToDB = (
  sessionID,
  uuid,
  nameGiven,
  nameFamily,
  phoneNum,
  address,
  brokingHouse,
  investmentTerm,
  tradingExp
) => {
  return async () => {
    await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/private/user/update-user-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "sessionId": `${sessionID}`
        },
        body: JSON.stringify({
          uuid,
          nameGiven,
          nameFamily,
          phoneNum,
          address,
          brokingHouse,
          investmentTerm,
          tradingExp
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
  method
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      method: method,
    })
  ).catch((e) => console.log(e));
};
