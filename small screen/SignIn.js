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
  Image,
} from "react-native";
import { useDispatch } from "react-redux";

import CustomButton from "../components/CustomButton";
import InputCard from "../components/InputCard";
import MyButton from "../components/MyButton";
import { Routes } from "../constants/routes";
import * as authActions from "../store/actions/auth";
import emailIcon from "../assets/icon-email.png"
import passIcon from "../assets/icon-pass.png"

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
        navigation.navigate(Routes.DETAILS_FORM, result);
      } else {
        console.log(result);
        dispatch(authActions.authenticate(result.uuid, result.sessionId, result.additionalData));
      }
    });
  };

  return (
    <View style={styles.signInMain}>
      <View style={styles.inputContainer}>
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
        Extra={{width: "85%", marginTop: 0}}
        extraStyle={{
          borderWidth: 0,
          borderColor: 'transparent',
        }}
        />
        <Image source={emailIcon} style={styles.iconImg}/>
      </View>
      
      {isResetPassword ? (
        <></>
      ) : (
        <View style={styles.inputContainer}>
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
          Extra={{width: "85%", marginTop: 0}}
          extraStyle={{
            borderWidth: 0,
            borderColor: 'transparent',
          }}
          />
          <Image source={passIcon} style={styles.iconImg}/>
        </View>
      )}

      <View style={styles.buttonCon}>
        {isLoading ? (
          <ActivityIndicator size="small" color={"#d3d3d3"} />
        ) : (
          <View style={{width: "90%"}}>
            {isResetPassword ? (
              <MyButton 
              onPress={resetHandler}>Reset Password</MyButton>
            ) : (
              <MyButton
              style={{backgroundColor: "#4885c7"}}
              onPress={authHandler}>Log In</MyButton>
            )}
          </View>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity 
        onPress={() => setIsResetPassword(!isResetPassword)}>
          <Text style={styles.forgetText}>{isResetPassword ? "Back To Log In" : "Forgot Password ?"}</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{ fontSize: 30, marginTop: 20, marginBottom: 5, color: "#ccc" }}
      >
        Or
      </Text>
      <Text style={{ letterSpacing: 1, marginBottom: 10, color: "white" }}>Sign In Via</Text>
      <View style={styles.others}>
        <CustomButton
          source={require("../assets/fb-icon.png")}
          onPress={altLoginMethodHandler.bind(
            this,
            authActions.loginViaFacebook,
            authActions.LOGIN_METHODS.FACEBOOK
          )}
        />
        <CustomButton
          source={require("../assets/google-icon.png")}
          onPress={altLoginMethodHandler.bind(
            this,
            authActions.loginViaGoogle,
            authActions.LOGIN_METHODS.GOOGLE
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInMain: {
    alignItems: "center",
    flex: 1,
  },
  others: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "70%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    backgroundColor: "white",
    justifyContent: "space-around",
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#b3b3b3',
    borderRadius: 10,
  },
  iconImg: {
    height: "auto",
    width: "10%",
    resizeMode: "contain",
    marginRight: 10,
  },
  buttonCon: {
    marginTop: 32,
    width: "100%",
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    // borderWidth: 2,
    // borderColor: "white",
  },
  forgetText: {
    color : "white",
    textDecorationLine: "underline",
    fontWeight: "700"
  }
});

export default SignInPage;
