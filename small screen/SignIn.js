import { CommonActions, useNavigation } from "@react-navigation/native";
import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";

import CustomButton from "../components/CustomButton";
import InputCard from "../components/InputCard";
import MyButton from "../components/MyButton";
import { Routes } from "../constants/routes";
import * as authActions from "../store/actions/auth";

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignInPage = () => {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Error, please try again later", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    Keyboard.dismiss();
    if (
      formState.inputValidities.email === false ||
      formState.inputValidities.password === false
    ) {
      Alert.alert(
        "Invalid Input !",
        "Make sure inputs are in correct format...",
        [{ text: "Okay" }]
      );
    } else if (
      formState.inputValues.email === "" ||
      formState.inputValues.password === ""
    ) {
      Alert.alert("Empty Field !", "Please fill up all inputs...", [
        { text: "Okay" },
      ]);
    } else {
      let action;
      action = authActions.loginViaEmail(
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);
      setIsLoading(true);
      dispatch(action).catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
    }
  };

  const resetHandler = async () => {
    Keyboard.dismiss();
    if (formState.inputValidities.email === false) {
      Alert.alert(
        "Invalid Email !",
        "Make sure it is correct email format...",
        [{ text: "Okay" }]
      );
    } else if (formState.inputValues.email === "") {
      Alert.alert(
        "Empty Field !",
        "Please fill up the email for reset password..."
      );
    } else {
      // console.log(formState.inputValues.email);
      let action;
      action = authActions.resetPassword(formState.inputValues.email);
      setError(null);
      setIsLoading(true);
      dispatch(action).catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
      Alert.alert(
        "Reset Sent ~",
        "Please check your email, also check the junk and spam folder to reassign a new password.",
        [{ text: "Okay" }]
      );
      setIsLoading(false);
      setIsResetPassword(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentify, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentify,
      });
    },
    [dispatchFormState]
  );

  const altLoginMethodHandler = (action) => {
    dispatch(action).then((result) => {
      if (result.isNewUser) {
        navigation.dispatch(CommonActions.navigate({ name: Routes.DETAILS_FORM }));
      } else {
        dispatch(authActions.authenticate(result.uuid, result.sessionId))
      }
    });
  };

  return (
    <View style={styles.signInMain}>
      <InputCard
        id="email"
        placeholder={
          isResetPassword === false ? "Email Address" : "Recovery Email Address"
        }
        placeholderTextColor="#8e8e8e"
        keyboardType="email-address"
        errorText="Please enter a valid email address"
        required
        email
        autoCapitalize="none"
        autoCorrect={false}
        onInputChange={inputChangeHandler}
        initialValue=""
      />
      {isResetPassword ? (
        <></>
      ) : (
        <InputCard
          id="password"
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          required
          errorText="Please enter valid password"
          minLength={8}
          onInputChange={inputChangeHandler}
          initialValue=""
        />
      )}

      <View style={{ marginTop: 32 }}>
        {isLoading ? (
          <ActivityIndicator size="small" color={"#d3d3d3"} />
        ) : (
          <View>
            {isResetPassword ? (
              <MyButton onPress={resetHandler}>RESET NOW</MyButton>
            ) : (
              <MyButton onPress={authHandler}>LOGIN</MyButton>
            )}
          </View>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <MyButton onPress={() => setIsResetPassword(!isResetPassword)}>
          {isResetPassword ? "BACK TO LOGIN" : "RESET PASSWORD ?"}
        </MyButton>
      </View>
      <Text
        style={{ fontSize: 30, marginTop: 20, marginBottom: 5, color: "#ccc" }}
      >
        OR
      </Text>
      <Text style={{ letterSpacing: 1, marginBottom: 10 }}>Sign In Via</Text>
      <View style={styles.others}>
        <CustomButton
          source={require("../assets/fb-icon.png")}
          onPress={altLoginMethodHandler.bind(this, authActions.loginViaFacebook)}
        />
        <CustomButton
          source={require("../assets/google-icon.png")}
          onPress={altLoginMethodHandler.bind(this, authActions.loginViaGoogle)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInMain: {
    alignItems: "center",
  },
  others: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "70%",
  },
});

export default SignInPage;
