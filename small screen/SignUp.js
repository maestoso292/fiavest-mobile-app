import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";
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

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedAddress, setSelectedAddress] = useState("Johor")
  const [selectedBroking, setSelectedBroking] = useState("Malacca");
  const [selectedTerm, setSelectedTerm] = useState("Short Term");
  const [selectedExperience, setSelectedExperience] = useState("0 year");
  const [isAgree, setIsAgree] = useState(false);
  const [passConError, setPassConError] = useState("Minimum length is 10");

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      nameGiven: "",
      nameFamily: "",
      email: "",
      password: "",
      phoneNum: "",
      actiCode: "",
    },
    inputValidities: {
      nameGiven: false,
      nameFamily: false,
      email: false,
      password: false,
      phoneNum: false,
      actiCode: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Opps, something happened...", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    Keyboard.dismiss();
    let action;
    if (isAgree === false) {
      Alert.alert("Term & Conditions not agree ? ", "Please agree to our term and conditions...", [{ text: "Okay"}])
    } else if (formState.inputValues.nameGiven === "" || formState.inputValues.nameFamily === "" || formState.inputValues.email === "" || formState.inputValues.password === "" || formState.inputValues.conPassword === "" || formState.inputValues.phoneNum === "" ) {
      Alert.alert("Empty Field !", "Please fill up all inputs...", [{ text: "Okay" }]);
    } else if (formState.inputValidities.nameGiven === false || formState.inputValidities.nameFamily === false || formState.inputValidities.email === false || formState.inputValidities.password === false || formState.inputValidities.phoneNum === false ) {
      Alert.alert("Invalid Input !", "Make sure inputs are in correct format...", [{ text: "Okay" }]);
    } else if (formState.inputValues.conPassword !== formState.inputValues.password) {
      Alert.alert("Password Not Match !", "Please double confirm the password again...", [{text: "Okay"}])
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
        parseInt(selectedExperience),
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
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.signUpMain}>
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
        <View style={styles.Picker}>
          <Text style={{ color: "#000" }}>Address (State) : </Text>
          <Picker
            selectedValue={selectedAddress}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedAddress(itemValue)
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
          </Picker>
        </View>
        <View style={styles.Picker}>
          <Text style={{ color: "#000" }}>Brokerage Company : </Text>
          <Picker
            selectedValue={selectedBroking}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedBroking(itemValue)
            }
          >
            <Picker.Item label="Malacca Securities Sdn Bhd" value="Malacca" />
            <Picker.Item label="Test 2" value="test 2" />
            <Picker.Item label="Test 3" value="test 3" />
            <Picker.Item label="Test 4" value="test 4" />
          </Picker>
        </View>
        <View style={styles.Picker}>
          <Text style={{ color: "#000" }}>Investment Term : </Text>
          <Picker
            selectedValue={selectedTerm}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedTerm(itemValue)}
          >
            <Picker.Item label="Short Term" value="Short Term" />
            <Picker.Item label="Medium Term" value="Medium Term" />
            <Picker.Item label="Long Term" value="Long Term" />
          </Picker>
        </View>
        <View style={styles.Picker}>
          <Text style={{ color: "#000" }}>Trading Experience : </Text>
          <Picker
            selectedValue={selectedExperience}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedExperience(itemValue)
            }
          >
            <Picker.Item label="0 year" value="0" />
            <Picker.Item label="1 year" value="1" />
            <Picker.Item label="2 year" value="2" />
            <Picker.Item label="3 year" value="3" />
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
              style={styles.termButton}
              onPress={() => alert("term and condition")}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signUpMain: {
    alignItems: "center",
    width: "100%",
  },
  Picker: {
    width: 300,
    borderWidth: 2,
    borderColor: "#b3b3b3",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 26,
  },
  termText: {
    color: "#2e64e5",
    textDecorationLine: "underline",
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
});

export default SignUpPage;
