import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  Component,
  FC,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
  TextInput,
  Animated
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import { fade } from "../animations/popup-anims";
import TNCPopUp from "../components/TNCPop-Up";

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

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedAddress, setSelectedAddress] = useState("Johor")
  const [selectedBroking, setSelectedBroking] = useState("Malacca");
  const [selectedTerm, setSelectedTerm] = useState("Short Term");
  const [isAgree, setIsAgree] = useState(false);
  const [isOthers, setIsOthers] = useState({
    broking: false,
    address: false,
  })
  const [showTNC, setShowTNC] = useState(false)
  const [passConError, setPassConError] = useState("Minimum length is 10");

  const dispatch = useDispatch();
  const fadeAnimate = useRef(new Animated.Value(0)).current;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      nameGiven: "",
      nameFamily: "",
      email: "",
      password: "",
      phoneNum: "",
      tradingExp: "",
      actiCode: "",
    },
    inputValidities: {
      nameGiven: false,
      nameFamily: false,
      email: false,
      password: false,
      phoneNum: false,
      tradingExp: false,
      actiCode: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Opps, something happened...", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    let endValue = showTNC ? 1 : 0;
    fade(fadeAnimate, endValue).start();
  }, [showTNC]);

  useFocusEffect(
    useCallback(() => {
        setShowTNC(false)
    }, [setShowTNC])
  )

  const closeTNC = () => {
    Keyboard.dismiss();
    setShowTNC(false);
    setIsAgree(true)
  }

  const openTNC = () => {
    setShowTNC(true);
  }

  const authHandler = async () => {
    Keyboard.dismiss();
    let action;
    if (isAgree === false) {
      Alert.alert("Term & Conditions not agree ? ", "Please agree to our term and conditions...", [{ text: "Okay"}])
    } else if (formState.inputValues.nameGiven === "" || formState.inputValues.nameFamily === "" || formState.inputValues.email === "" || formState.inputValues.password === "" || formState.inputValues.conPassword === "" || formState.inputValues.phoneNum === "" || formState.inputValues.tradingExp === "") {
      Alert.alert("Empty Field !", "Please fill up all inputs...", [{ text: "Okay" }]);
    } else if (formState.inputValidities.nameGiven === false || formState.inputValidities.nameFamily === false || formState.inputValidities.email === false || formState.inputValidities.password === false || formState.inputValidities.phoneNum === false || formState.inputValues.tradingExp === false ) {
      Alert.alert("Invalid Input !", "Make sure inputs are in correct format...", [{ text: "Okay" }]);
    } else if (formState.inputValues.conPassword !== formState.inputValues.password) {
      // Alert.alert("Password Not Match !", "Please double confirm the password again...", [{text: "Okay"}])
      setPassConError("Password not Match !")
    } else {
      action = authActions.registerViaEmail(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.nameGiven,
        formState.inputValues.nameFamily,
        formState.inputValues.phoneNum,
        selectedAddress,
        selectedBroking,
        selectedTerm,
        parseInt(formState.inputValues.tradingExp),
        formState.inputValues.actiCode,
      );
      setError(null);
      setIsLoading(true);
      dispatch(action).catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
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
    },[dispatchFormState]
  );

  return (
    <View>
      <ScrollView contentContainerStyle={styles.signUpMain}>
        <InputCard
          id="nameGiven"
          placeholder="First Name"
          keyboardType="default"
          autoCorrect={false}
          required
          errorText="Please enter first name"
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <InputCard
          id="nameFamily"
          placeholder="Last Name"
          keyboardType="default"
          autoCorrect={false}
          required
          errorText="Please enter last name"
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <InputCard
          id="password"
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          required
          errorText="Minimum length is 10"
          minLength={10}
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <InputCard
          id="conPassword"
          placeholder="Password Confirm"
          keyboardType="default"
          secureTextEntry={true}
          required
          errorText={passConError}
          minLength={10}
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <InputCard
          id="email"
          placeholder="Email Address"
          keyboardType="email-address"
          errorText="Please enter a valid email address"
          autoCapitalize="none"
          required
          email
          autoCorrect={false}
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <InputCard
          id="phoneNum"
          placeholder="Phone Number"
          keyboardType="phone-pad"
          errorText="Please enter a valid phone number"
          required
          minLength={8}
          maxLength={10}
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <InputCard
          id="tradingExp"
          placeholder="Trading Experience (years) (Enter 0 if less than 1)"
          keyboardType="numeric"
          errorText="Please enter a valid years"
          required
          maxLength={2}
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <View style={styles.Picker}>
          <Text style={{ color: "#000" }}>Address (State) : </Text>
          <Picker
            selectedValue={selectedAddress}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === "others") {
                setIsOthers(old => ({
                  ...old,
                  address: true
                }))
              } else {
                setIsOthers(old => ({
                  ...old,
                  address: false
                }))
                setSelectedAddress(itemValue)
              }
            }
            }
          >
            <Picker.Item label="Johor" value="Johor" />
            <Picker.Item label="Kedah" value="Kedah" />
            <Picker.Item label="Kelantan" value="Kelantan" />
            <Picker.Item label="Malacca" value="Malacca" />
            <Picker.Item label="Negeri Sembilan" value="Negeri Sembilan" />
            <Picker.Item label="Pahang" value="Pahang" />
            <Picker.Item label="Penang" value="Penang" />
            <Picker.Item label="Perak" value="Perak" />
            <Picker.Item label="Perlis" value="Perlis" />
            <Picker.Item label="Sabah" value="Sabah" />
            <Picker.Item label="Sarawak" value="Sarawak" />
            <Picker.Item label="Selangor" value="Selangor" />
            <Picker.Item label="Terengganu" value="Terengganu" />
            <Picker.Item label="Kuala Lumpur" value="Kuala Lumpur" />
            <Picker.Item label="Labuan" value="Labuan" />
            <Picker.Item label="Putrajaya" value="Putrajaya" />
            <Picker.Item label="Others" value="others" />
          </Picker>
        </View>
        {isOthers.address && (
          <TextInput 
          style={styles.inputOther}
          placeholder="Other Country / State ?"
          onChange={(value) => setSelectedAddress(value)}
          />
        )}
        <View style={styles.Picker}>
          <Text style={{ color: "#000" }}>Brokerage Company : </Text>
          <Picker
            selectedValue={selectedBroking}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === "others") {
                setIsOthers(old => ({
                  ...old,
                  broking: true
                }))
              } else {
                setIsOthers(old => ({
                  ...old,
                  broking: false
                }))
                setSelectedBroking(itemValue)
              }
            }}
          >
            <Picker.Item label="Malacca Securities Sdn Bhd" value="Malacca Securities Sdn Bhd" />
            <Picker.Item label="Public Bank" value="Public Bank" />
            <Picker.Item label="Kenaga Investors Berhad" value="Kenaga Investors Berhad" />
            <Picker.Item label="Rakuten" value="Rakuten" />
            <Picker.Item label="CIMB Bank" value="CIMB Bank" />
            <Picker.Item label="Maybank" value="Maybank" />
            <Picker.Item label="RHB Bank" value="RHB Bank" />
            <Picker.Item label="Hong Leong Bank" value="Hong Leong Bank" />
            <Picker.Item label="UOB Kay Hian" value="UOB Kay Hian" />
            <Picker.Item label="Alliance Bank" value="Alliance Bank" />
            <Picker.Item label="Others" value="others" />
          </Picker>
        </View>
        {isOthers.broking && (
          <TextInput 
          style={styles.inputOther}
          placeholder="Other Brokerage Company ?"
          onChange={(value) => setSelectedBroking(value)}
          />
        )}
        <View style={styles.Picker}>
          <Text style={{ color: "#000" }}>Investment Term : </Text>
          <Picker
            selectedValue={selectedTerm}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedTerm(itemValue)}
          >
            <Picker.Item label="Short Term 短期" value="Short Term" />
            <Picker.Item label="Medium Term 中期" value="Medium Term" />
            <Picker.Item label="Long Term 长期" value="Long Term" />
          </Picker>
        </View>
        <InputCard
          id="actiCode"
          placeholder="Activation Code (Optional)"
          keyboardType="default"
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <View style={styles.TandC}>
          <CheckBox
            value={isAgree}
            onValueChange={(newValue) => setIsAgree(newValue)}
          />
          <View style={styles.termAndCondition}>
            <Text>By ticking this, you agree to our </Text>
            <TouchableOpacity
              onPress={openTNC}
            >
              <Text style={styles.termText}>T & C</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 32 }}>
          {isLoading ? (
            <ActivityIndicator size="small" color={"#d3d3d3"} />
          ) : (
            <MyButton onPress={authHandler}>Register</MyButton>
          )}
        </View>
      </ScrollView>
      <TNCPopUp 
        visible={showTNC}
        onClose={closeTNC}
        popupStyle={{opacity: fadeAnimate}}
        conStyle={{height: "100%"}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  signUpMain: {
    alignItems: "center",
    width: "100%",
  },
  Picker: {
    width: '90%',
    borderWidth: 2,
    borderColor: "#b3b3b3",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  termText: {
    color: "#2e64e5",
    // textDecorationLine: "underline",
    //justifyContent: 'flex-start'
  },
  TandC: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    marginTop: 40,
    marginBottom: 10,
  },
  termAndCondition: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  inputOther: {
    width: '90%',
    borderWidth: 2,
    marginTop: 20,
    borderColor: '#b3b3b3',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  }
});

export default SignUpPage;
