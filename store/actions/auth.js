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

export const authenticate = (uuid, sessionId, additionalData = {}) => {
  return (dispatch) => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      uuid: uuid,
      sessionId: sessionId,
      additionalData: additionalData,
    });
  };
};

export const loginViaFacebook = async (dispatch) => {
  try {
    const facebookResponse = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    if (type === "success") {
      const facebookGraphResponse = await fetch(
        `https://graph.facebook.com/me?access_token=${facebookResponse.token}`
      );

      if (facebookGraphResponse.ok) {
        const tempData = await facebookGraphResponse.json();
        // console.log(tempData);
      }

      const fiavestResponse = loginFiavestViaFacebook(facebookResponse.userId);

      saveDataToLocal(
        fiavestResponse.uuid,
        fiavestResponse.sessionId,
        LOGIN_METHODS.FACEBOOK,
        {
          facebookId: facebookResponse.userId,
          facebookToken: facebookResponse.token,
          facebookTokenExpirationDate: facebookResponse.expirationDate,
        }
      );

      return {
        ...fiavestResponse,
        method: LOGIN_METHODS.FACEBOOK,
        additionalData: {
          facebookId: facebookResponse.userId,
          facebookToken: facebookResponse.token,
        },
      };
    } else {
      let message = "Facebook Login Failed";
      throw new Error(message);
    }
  } catch (e) {
    throw new Error(`Facebook Login Error : ${e}`);
  }
};

export const autoLoginViaFacebook = async (dispatch) => {
  try {
    const facebookResponse = await Facebook.getAuthenticationCredentialAsync();

    if (facebookResponse.type === "success") {
      const fiavestResponse = loginFiavestViaFacebook(facebookResponse.userId);

      saveDataToLocal(
        fiavestResponse.uuid,
        fiavestResponse.sessionId,
        LOGIN_METHODS.FACEBOOK,
        {
          facebookId: facebookResponse.userId,
          facebookToken: facebookResponse.token,
          facebookTokenExpiryDate: facebookResponse.expirationDate,
        }
      );
    }

    return {
      ...fiavestResponse,
      method: LOGIN_METHODS.FACEBOOK,
      additionalData: {
        facebookId: facebookResponse.userId,
        facebookToken: facebookResponse.token,
      },
    };
  } catch (err) {
    console.log(err);
    dispatch(setDidAutoLogin);
  }
};

export const loginViaGoogle = async (dispatch) => {
  try {
    const googleResponse = await Google.logInAsync({
      androidClientId:
        "950808968576-mnhc5gcaqt787o33ccukn1bfvch8pepe.apps.googleusercontent.com",
      iosClientId:
        "950808968576-ufc28236nnhdh3ickcv8beugfd43do5m.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (googleResponse.type === "success") {
      const fiavestResponse = loginFiavestViaGoogle(googleResponse.user.id);

      saveDataToLocal(
        fiavestResponse.uuid,
        fiavestResponse.sessionId,
        LOGIN_METHODS.GOOGLE,
        {
          googleAccessToken: googleResponse.accessToken,
          googleRefreshToken: googleResponse.refreshToken,
        }
      );

      return {
        ...fiavestResponse,
        method: LOGIN_METHODS.GOOGLE,
        additionalData: {
          googleId: googleResponse.user.id,
          googleAccessToken: googleResponse.accessToken,
        },
      };
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
    const googleResponse = await fetch(
      "https://securetoken.googleapis.com/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      }
    );

    if (!googleResponse.ok) {
      const errorResData = await googleResponse.json();
      const errorID = errorResData.error.message;
      let message = "Something wrong";
      if (errorID === "EMAIL_EXISTS") {
        message = "This email exist already!";
      }
      throw new Error(message + errorID);
    }

    const fiavestResponse = loginFiavestViaGoogle(googleResponse.user.id);

    saveDataToLocal(
      fiavestResponse.uuid,
      fiavestResponse.sessionId,
      LOGIN_METHODS.GOOGLE,
      {
        googleAccessToken: googleResponse.accessToken,
        googleRefreshToken: googleResponse.refreshToken,
      }
    );

    return {
      ...fiavestResponse,
      method: LOGIN_METHODS.GOOGLE,
      additionalData: {
        googleId: googleResponse.user.id,
        googleAccessToken: googleResponse.accessToken,
      },
    };
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
  actiCode
) => {
  return async (dispatch) => {
    if (actiCode === "") actiCode = null;
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
        message = "Email Registered";
      }
      throw new Error(message);
    }

    const responseData = await response.json();
    // console.log(responseData);

    await dispatch(loginViaEmail(email, password));

    const userData = await AsyncStorage.getItem("userData");
    const jsonData = JSON.parse(userData);
    // console.log(jsonData);

    dispatch(
      writeUserDataToDB(
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
      responseData.uuid,
      responseData.sessionId,
      LOGIN_METHODS.EMAIL
    );
    dispatch(authenticate(responseData.uuid, responseData.sessionId));
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
          url: "http://localhost:3000/resetPass",
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
  };
};

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
          sessionId: `${sessionID}`,
        },
        body: JSON.stringify({
          uuid,
          nameGiven,
          nameFamily,
          phoneNum,
          address,
          brokingHouse,
          investmentTerm,
          tradingExp,
        }),
      }
    );
  };
};

export const logout = () => {
  const userData = AsyncStorage.getItem("userData");

  const fiavestResponse = await fetch(
    "https://fiavest-plus-app-api.fiavest.com/api/public/logout",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  switch (method) {
    case LOGIN_METHODS.FACEBOOK:
      try {
        Facebook.logOutAsync();
      } catch (err) {
        console.log(err);
      }
      break;
    case LOGIN_METHODS.GOOGLE:
      const googleResponse = Google.logOutAsync({
        accessToken: userData.googleAccessToken,
        androidClientId:
          "950808968576-mnhc5gcaqt787o33ccukn1bfvch8pepe.apps.googleusercontent.com",
        iosClientId:
          "950808968576-ufc28236nnhdh3ickcv8beugfd43do5m.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      break;
    default:
      break;
  }

  AsyncStorage.removeItem("userData");

  return { type: LOGOUT };
};

const loginFiavestViaGoogle = (googleId) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/public/login/google",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleId: googleId,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await repsonse.json();
      const errorID = errorResData.error.message;
      let message = `Something went wrong: ${errorID}`;
      console.log(errorResData);
      throw new Error(message);
    }

    const responseData = await response.json();
    return responseData;
  };
};

const loginFiavestViaFacebook = (facebookId) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://fiavest-plus-app-api.fiavest.com/api/public/login/facebook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facebookId: facebookId,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      let message = `Something went wrong: ${errorID}`;
      console.log(errorResData);
      throw new Error(message);
    }

    const responseData = await response.json();
    return responseData;
  };
};

const saveDataToLocal = async (
  uuid,
  sessionId,
  method,
  additionalData = {}
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      sessionId: sessionId,
      uuid: uuid,
      method: method,
      ...additionalData,
    })
  ).catch((e) => console.log(e));
};
