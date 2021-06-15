/* import React, { useCallback, useState, useReducer, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Image, Text, ScrollView, ActivityIndicator, Alert  } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import InputCard from '../components/InputCard';
import MyButton from '../components/MyButton';
import { useDispatch, Provider } from 'react-redux';
import * as authAction from '../store/actions/auth';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  if(action.type === FORM_UPDATE) {
    const updatedInfo = {
      ...state.inputInfo,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedValidForm = true;
    for(const key in updatedValidities) {
      updatedValidForm = updatedValidForm && updatedValidities[key];
    }
    return {
      validForm: updatedValidForm,
      inputValidities: updatedValidities,
      inputInfo: updatedInfo
    };
  }
  return state;
};

<Provider formReducer={formReducer}>
  <AuthScreen />
</Provider>

const AuthScreen = props => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isLogin, setIsLogin] = useState(true);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputInfo: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    validForm: false
  });

  useEffect(() => {
    if(error) {
      Alert.alert('Thats an error', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if(isLogin) {
      action = authAction.login(
        formState.inputInfo.email,
        formState.inputInfo.password,
      );} else {
        action = authAction.register(
          formState.inputInfo.email,
          formState.inputInfo.password,
        );
      }
      setError(null);
      setIsLoading(true);
      try{
        await dispatch(action);
        //props.navigation.navigate('Home')
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    const inputChangeHandler = useCallback(
      (inputIdentify, inputValue, inputValidity) => {
        dispatchFormState ({
          type: FORM_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentify,
        });
      }, [dispatchFormState]
    );

  const Tab = createMaterialTopTabNavigator();

  function Login() {
    return (
      <View style={styles.loginContainer}>
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
          <ScrollView>
            <InputCard
            id="email"
            placeholder='Email Address'
            keyboardType='email-address'
            errorText="Please enter a valid email address"
            email
            noSpace
            onInputChange={inputChangeHandler}
            initialValue=""
            />
            <InputCard 
            id="password"
            placeholder='Password'
            keyboardType='default' 
            secureTextEntry={true}
            errorText="Please enter valid password"
            noSpace
            minLength={8}
            onInputChange={inputChangeHandler}
            initialValue=''
            />
            <View style={{marginTop:32}}>
              {isLoading ? (
                <ActivityIndicator size="small" color={'#d3d3d3'} />
              ) : (
                <MyButton onPress={()=>{
                  setIsLogin(true);
                  authHandler();
                }}>
                LOGIN
                </MyButton>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  function Register() {
    return (
      <View style={styles.registerContainer}>
        <Text>Ko</Text>
        <MyButton onPress={() => {}} >REGISTER</MyButton>
      </View>
    );
  };

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image 
          source = {require('../assets/fiavest-logo2.png')}
          style = {styles.img}
          />
        </View>
        <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="LOGIN" component={Login} />
              <Tab.Screen name="REGISTER" component={Register} />
            </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        //backgroundColor: 'yellow',
      },
    imgContainer: {
        marginHorizontal: 32,
        marginTop: 16,
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        //borderColor: 'black',
      },
    img: {
        width: '100%',
        height: '100%',
        //borderWidth: 1,
        //borderColor: 'yellow',
        resizeMode: 'contain',
    },

    loginContainer: {
      //backgroundColor: '#A9BAFF',
      flex: 1,
      width: '100%',
      //marginLeft: 16,
      //marginTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },

    registerContainer: {
      //backgroundColor: '#A9BADB',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    screen: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
    },

});

export default AuthScreen; */