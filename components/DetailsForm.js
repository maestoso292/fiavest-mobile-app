import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Keyboard, TouchableOpacity, TextInput, Animated} from 'react-native'
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch } from "react-redux";

import MyButton from './MyButton'
import * as authAction from "../store/actions/auth"
import { useFocusEffect } from '@react-navigation/native';
import { fade } from '../animations/popup-anims';
import TNCPopUp from './TNCPop-Up';
import InputCard from './InputCard';

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
const DetailsForm = ({route, navigation}) => {

    const dispatch = useDispatch();

    const [details, setDetails] = useState({
        address: "Johor",
        brokingHouse: "Malacca Securities Sdn Bhd",
        investmentTerm: "Short Term",
    })
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isAgree, setIsAgree] = useState(false)
    const [isOthers, setIsOthers] = useState({
        address: false,
        broking: false
    })
    const [viewTNC, setViewTNC] = useState(false)

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          nameGiven: "",
          nameFamily: "",
          email: "",
          phoneNum: "",
          tradingExp: "",
        },
        inputValidities: {
          nameGiven: false,
          nameFamily: false,
          email: false,
          phoneNum: false,
          tradingExp: false,
        },
        formIsValid: false,
      });

    const fadeAnimate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let endValue = viewTNC ? 1 : 0;
        fade(fadeAnimate, endValue).start();
    }, [viewTNC]);

    useEffect(() => {
        if (error) {
          Alert.alert("Opps, something happened...", error, [{ text: "Okay" }]);
        }
      }, [error]);

    useFocusEffect(
        useCallback(() => {
            setViewTNC(false)
        }, [setViewTNC])
    )

    const closeTNC = () => {
        Keyboard.dismiss();
        setViewTNC(false);
        setIsAgree(true)
    }

    const openTNC = () => {
        setViewTNC(true);
    }

    const inputHandler = useCallback(
        (inputIdentify, inputValue, inputValidity) => {
            dispatchFormState({
              type: FORM_UPDATE,
              value: inputValue,
              isValid: inputValidity,
              input: inputIdentify,
            });
        },[dispatchFormState]
    )

    const submitHandler = async () => {
        Keyboard.dismiss();
        let action;
        if (isAgree === false) {
            Alert.alert("Term & Conditions not agree ? ", "Please agree to our term and conditions...", [{ text: "Okay"}])
          } else if (formState.inputValues.nameGiven === "" || formState.inputValues.nameFamily === "" || formState.inputValues.email === "" || formState.inputValues.phoneNum === "" || formState.inputValues.tradingExp === "" ) {
            Alert.alert("Empty Field !", "Please fill up all inputs...", [{ text: "Okay" }]);
          } else if (formState.inputValidities.nameGiven === false || formState.inputValidities.nameFamily === false || formState.inputValidities.email === false || formState.inputValidities.phoneNum === false || formState.inputValues.tradingExp === false) {
            Alert.alert("Invalid Input !", "Make sure inputs are in correct format...", [{ text: "Okay" }]);
          } else {
              console.log("Use it");
            // action = authActions.registerViaEmail(
            //   formState.inputValues.email,
            //   formState.inputValues.password,
            //   formState.inputValues.nameGiven,
            //   formState.inputValues.nameFamily,
            //   formState.inputValues.phoneNum,
            //   selectedAddress,
            //   selectedBroking,
            //   selectedTerm,
            //   parseInt(formState.inputValues.tradingExp),
            //   formState.inputValues.actiCode,
            // );
            // setError(null);
            // setIsLoading(true);
            // dispatch(action).catch((err) => {
            //   setError(err.message);
            //   setIsLoading(false);
            // });
          }
    }

    return (
        <View style={styles.mainBody}>
            <ScrollView contentContainerStyle={styles.ScrollBody}>
                <Text style={styles.remindText}>We wants to know you more ~</Text>

                <InputCard
                Extra={{width : "100%"}}
                id="nameGiven"
                placeholder="First Name"
                keyboardType="default"
                autoCorrect={false}
                required
                errorText="Please enter first name"
                onInputChange={inputHandler}
                initialValue=""
                />

                
                <InputCard
                Extra={{width : "100%"}}
                id="nameFamily"
                placeholder="Last Name"
                keyboardType="default"
                autoCorrect={false}
                required
                errorText="Please enter last name"
                onInputChange={inputHandler}
                initialValue=""
                />

                <InputCard
                Extra={{width : "100%"}}
                id="email"
                placeholder="Email Address"
                keyboardType="email-address"
                errorText="Please enter a valid email address"
                autoCapitalize="none"
                required
                email
                autoCorrect={false}
                onInputChange={inputHandler}
                initialValue=""
                />

                <InputCard
                Extra={{width : "100%"}}
                id="phoneNum"
                placeholder="Phone Number"
                keyboardType="phone-pad"
                errorText="Please enter a valid phone number"
                required
                minLength={8}
                maxLength={10}
                onInputChange={inputHandler}
                initialValue=""
                />

                <InputCard
                Extra={{width : "100%"}}
                id="tradingExp"
                placeholder="Trading Experience (years) (Enter 0 if less than 1)"
                keyboardType="numeric"
                errorText="Please enter a valid years"
                required
                maxLength={2}
                onInputChange={inputHandler}
                initialValue=""
                />
                
                <View style={styles.Picker}>
                    <Text style={{ color: "#000" }}>Address (State) : </Text>
                    <Picker
                        selectedValue={details.address}
                        style={{ height: 30, width: 150 }}
                        onValueChange={(itemValue) => {
                        if (itemValue === "others") {
                            setDetails(old => ({
                                ...old,
                                address: ""
                            }))
                            setIsOthers(old => ({
                            ...old,
                            address: true
                            }))
                        } else {
                            setIsOthers(old => ({
                            ...old,
                            address: false
                            }))
                            setDetails(old => ({
                                ...old,
                                address: itemValue
                            }))
                        }}}
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
                    onChange={(value) => {
                        setDetails(old => ({
                            ...old,
                            address: value
                        }))
                    }}
                    />
                )}
                <View style={styles.Picker}>
                    <Text style={{ color: "#000" }}>Brokerage Company : </Text>
                    <Picker
                        selectedValue={details.brokingHouse}
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
                            setDetails(old => ({
                                ...old,
                                brokingHouse: itemValue
                            }))
                        }
                        }}>
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
                    onChange={(value) => {
                        setDetails(old => ({
                            ...old,
                            brokingHouse: value
                        }))
                    }}
                    />
                )}
                <View style={styles.Picker}>
                    <Text style={{ color: "#000" }}>Investment Term : </Text>
                    <Picker
                        selectedValue={details.investmentTerm}
                        style={{ height: 30, width: 150 }}
                        onValueChange={(itemValue) => {
                            setDetails(old => ({
                                ...old,
                                investmentTerm: itemValue
                            }))
                        }}
                    >
                        <Picker.Item label="Short Term 短期" value="Short Term" />
                        <Picker.Item label="Medium Term 中期" value="Medium Term" />
                        <Picker.Item label="Long Term 长期" value="Long Term" />
                    </Picker>
                </View>
                {error && (
                    <View style={styles.errorCon}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}
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
                {isLoading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={"#d3d3d3"} />
                    </View>
                ) : (
                    <View style={{width: "60%"}}>
                        <MyButton onPress={submitHandler}>SUBMIT</MyButton>
                    </View>
                )}
            </ScrollView>
            <TNCPopUp 
                visible={viewTNC}
                onClose={closeTNC}
                popupStyle={{opacity: fadeAnimate}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: "center"
    },
    ScrollBody: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        padding: 20,
        flexGrow: 1
    },
    remindText: {
        textAlign: "center",
        fontSize: 20,
    },
    Picker: {
      width: "100%",
      borderWidth: 2,
      borderColor: "#b3b3b3",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
    },
    errorCon: {
        width: "100%",
        marginTop: 20,
        paddingVertical: 15,
        fontSize: 16,
        borderWidth: 2,
        borderColor: "#b3b3b3",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#d3d3d3"
    },
    errorText: {
        color: "#B22222",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    TandC: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "70%",
      marginTop: 20,
      marginBottom: 10,
    },
    termAndCondition: {
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "100%",
    },
    termText: {
      color: "#2e64e5",
    //   textDecorationLine: "underline",
      //justifyContent: 'flex-start'
    },
    inputOther: {
      width: '100%',
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
})

export default DetailsForm
