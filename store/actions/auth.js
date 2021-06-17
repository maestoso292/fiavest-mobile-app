export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";

//(email, password) add more info inside this bracket
export const register = (email, password) => {
  return async (dispatch) => {
    fetch(
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
      throw new Error("Somethings wrong");
    }

    const responceData = await response.json();

    dispatch({ type: REGISTER });
  };
};

// Temporary login action
export const login = () => {
  return async (dispatch) => {
    dispatch({ type: LOGIN, token: "TEMP_TOKEN", userID: "TEMP_UID" });
  };
};
