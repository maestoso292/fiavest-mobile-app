import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { firebase } from "@react-native-firebase/auth";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const DID_AUTO_LOGIN = "DID_AUTO_LOGIN";

export const setDidAutoLogin = () => {
  return (dispatch) => {
    dispatch({ type: DID_AUTO_LOGIN });
  };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const loginViaFacebook = async () => {
    try {
      await Facebook.initializeAsync({
          appId: '484772439271129'
      });
      const {type, token, expirationDate, permissions, declinedPermissions,} = 
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success'){
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const responseData = await response.json();
        console.log(responseData);
        props.navigation.navigate('Home');
        alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        console.log('Cancel');
      };
    } catch ({errMessage}) {
    console.log(`Facebook Login Error : ${errMessage}`);
    };
};

{/*export const loginViaGoogle = async () => {
    const {type, accessToken, user} = await Google.logInAsync(config);

    if(type === 'success'){
        let userInfo = await fetch
    }
}*/}

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

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToLocal(responseData.token, responseData.localId, expirationDate);
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
        parseInt(responseData.expiresIn) * 1000
      )
      );
      

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
      );


    saveDataToLocal(responseData.idToken, responseData.localId, expirationDate);
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveDataToLocal = async (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
    ).catch((e) => console.log(e));
};
