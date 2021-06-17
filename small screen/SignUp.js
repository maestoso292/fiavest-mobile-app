import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';

import CustomButton from '../components/CustomButton';
import InputCard from '../components/InputCard';
import MyButton from '../components/MyButton';
import * as authActions from '../store/actions/auth';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const SignUpPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [selectedBroking, setSelectedBroking] = useState("Malacca");
    const [selectedTerm, setSelectedTerm] = useState("Short Term");
    const [selectedExperience, setSelectedExperience] = useState("0 year");
    const [isAgree, setIsAgree] = useState(false);

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
          },
          inputValidities: {
            email: false,
            password: false,
          },
          formIsValid: false
    });
    
    useEffect(() => {
      if (error) {
        Alert.alert('Error, please try again later', error, [{text : 'Okay'}]);
      }
    }, [error]);

    const authHandler = async() => {
        console.log('register')
        let action;
        action = authActions.register(
          formState.inputValues.email,
          formState.inputValues.password,
        );
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(action);
          //props.navigation.navigate('Home');
        } catch(err) {
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
          input: inputIdentify
        });
      }, [dispatchFormState]
    );

    return (
    <ScrollView>
        <View style={styles.signUpMain}>
            <InputCard
            id="username"
            placeholder='Username'
            keyboardType='default'
            autoCorrect={false}
            required
            onInputChange={inputChangeHandler}
            initialValue=''
            />
            <InputCard
            id="password"
            placeholder='Password'
            keyboardType='default' 
            secureTextEntry={true}
            required
            errorText="Please enter valid password"
            minLength={8}
            onInputChange={inputChangeHandler}
            initialValue=''
            />
            <InputCard
            id="conPassword"
            placeholder='Password Confirm'
            keyboardType='default' 
            secureTextEntry={true}
            required
            errorText="Password not matches"
            minLength={8}
            onInputChange={inputChangeHandler}
            initialValue=''
            />
            <InputCard
            id="email"
            placeholder='Email Address'
            keyboardType='email-address'
            errorText="Please enter a valid email address"
            autoCapitalize="none"
            required
            email
            autoCorrect={false}
            onInputChange={inputChangeHandler}
            initialValue=''
            />
            <InputCard
            id="address"
            placeholder='Address'
            keyboardType='default'
            autoCorrect={false}
            errorText="Please enter a valid address"
            required
            minLength={10}
            onInputChange={inputChangeHandler}
            initialValue=''
            />
            <View style={styles.Picker}>
                <Text style={{color: '#000'}}>Brokerage Company : </Text>
                <Picker
                selectedValue={selectedBroking}
                style = {{height: 30, width: 150}}
                onValueChange={(itemValue, itemIndex) => setSelectedBroking(itemValue)}
                >
                    <Picker.Item label="Malacca Securities Sdn Bhd" value="Malacca" />
                    <Picker.Item label="Test 2" value="test 2" />
                    <Picker.Item label="Test 3" value="test 3" />
                    <Picker.Item label="Test 4" value="test 4" />
                </Picker>
            </View>
            <View style={styles.Picker}>
                <Text style={{color: '#000'}}>Investment Term : </Text>
                <Picker
                selectedValue={selectedTerm}
                style = {{height: 30, width: 150}}
                onValueChange={(itemValue, itemIndex) => setSelectedTerm(itemValue)}
                >
                    <Picker.Item label="Short Term" value="short" />
                    <Picker.Item label="Medium Term" value="medium" />
                    <Picker.Item label="Long Term" value="long" />
                </Picker>
            </View>
            <View style={styles.term}>
                <TouchableOpacity style={styles.termButton} onPress={() => alert('Forget')} >
                    <Text style={styles.termText}>Term ?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Picker}>
                <Text style={{color: '#000'}}>Trading Experience : </Text>
                <Picker
                selectedValue={selectedExperience}
                style = {{height: 30, width: 150}}
                onValueChange={(itemValue, itemIndex) => setSelectedExperience(itemValue)}
                >
                    <Picker.Item label="0 year" value="0" />
                    <Picker.Item label="1 year" value="1" />
                    <Picker.Item label="2 year" value="2" />
                    <Picker.Item label="3 year" value="3" />
                </Picker>
            </View>
            <View style={styles.TandC}>
                <CheckBox 
                disabled={false}
                value={isAgree}
                onValueChange={(newValue) => setIsAgree(newValue)}
                />
                <View style={styles.termAndCondition}>
                    <Text>By ticking this, you agree to our </Text>
                    <TouchableOpacity style={styles.termButton} onPress={() => alert('term and condition')} >
                        <Text style={styles.termText} >T & C</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={{marginTop:32}}>
                <MyButton onPress={authHandler}>Register</MyButton>
            </View> */}
            <View style={{marginTop:32}}>
              {isLoading ? (
                <ActivityIndicator size="small" color={'#d3d3d3'} />
              ) : (
                <MyButton onPress={authHandler}>
                Register
                </MyButton>
              )}
              {/* <MyButton onPress={() => {}}>Sign In</MyButton>
              <TouchableOpacity style={styles.forgetButton} onPress={() => alert('Forget')} >
                <Text style={styles.forgetText}>Reset Password</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{marginTop: 30}} />
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    signUpMain: {
        alignItems: 'center',
        width: '100%',
    },
    Picker: {
        width: 300,
        borderWidth: 2,
        borderColor: '#b3b3b3',
        padding: 10,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 26,
    },
    termText: {
        color: '#2e64e5',
        textDecorationLine: 'underline',
        //justifyContent: 'flex-start'
    },
    termButton: {
        //marginTop: 5,
        alignSelf: 'flex-start'
    },
    term: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '70%'
    },
    TandC: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        marginTop: 50,
        marginBottom: 10
    },
    termAndCondition: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%'
    }
});

export default SignUpPage;