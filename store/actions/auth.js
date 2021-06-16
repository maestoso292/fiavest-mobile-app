import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      disTryAutoLogin: true,
    });
  };
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

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime + parseInt(responseData.expiresIn) * 1000
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
      switch (errorID) {
        case "EMAIL_NOT_FOUND":
        case "INVALID_PASSWORD":
          message = "Invalid credentials";
          break;
        case "USER_DISABLED":
          message = "Account has been disabled";
          break;
        default:
      }
      throw new Error(message + errorID);
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
      new Date().getTime + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToLocal(responseData.token, responseData.localId, expirationDate);
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveDataToLocal = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
