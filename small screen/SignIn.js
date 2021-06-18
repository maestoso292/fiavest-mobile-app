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
} from "react-native";
import { useDispatch } from "react-redux";

import CustomButton from "../components/CustomButton";
import InputCard from "../components/InputCard";
import MyButton from "../components/MyButton";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

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
    console.log(formState.inputValues.email);
    console.log(formState.inputValues.password);
    let action;
    action = authActions.login(
      formState.inputValues.email,
      formState.inputValues.password
    );
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
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

  {/*logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
  } */}

  return (
    <View style={styles.signInMain}>
      <InputCard
        id="email"
        placeholder="Email Address"
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
      <View style={{ marginTop: 32 }}>
        {isLoading ? (
          <ActivityIndicator size="small" color={"#d3d3d3"} />
        ) : (
          <MyButton onPress={authHandler}>Login</MyButton>
        )}
      </View>
      <Text
        style={{ fontSize: 30, marginTop: 10, marginBottom: 5, color: "#ccc" }}
      >
        OR
      </Text>
      <Text style={{ letterSpacing: 1, marginBottom: 10 }}>Sign In Via</Text>
      <View style={styles.others}>
        <CustomButton
          source={require("../assets/fb-icon.png")}
          onPress={() => dispatch(authActions.loginViaFacebook)}
        />
        <CustomButton
          source={require("../assets/google-icon.png")}
          onPress={() => dispatch(authActions.loginViaGoogle)}
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
  forgetText: {
    color: "#2e64e5",
    textDecorationLine: "underline",
  },
  forgetButton: {
    alignItems: "center",
    marginTop: 15,
  },
});

export default SignInPage;
