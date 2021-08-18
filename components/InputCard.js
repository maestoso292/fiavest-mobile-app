import React, { useEffect, useReducer } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return{
                ...state,
                value: action.value,
                isValid: action.isValid,
                touched: true
            };
        case INPUT_BLUR:
            return{
                ...state,
                touched: true
            };
        default:
            return state;
    }
}

const InputCard = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initValid,
        touched: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
        const emailRegex = 
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }
        if (props.maxLength != null && text.length > props.maxLength) {
        isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    return (
        <View style={[styles.inputCon, props.Extra]}>
            <TextInput 
            style={[styles.inputBox, props.extraStyle]}
            {...props}
            value={inputState.value}
            onChangeText={textChangeHandler}
            />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputCon: {
        width: '90%',
        //alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    inputBox: {
        borderWidth: 2,
        borderColor: '#b3b3b3',
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
    },
    errorContainer: {
        width: "100%",
        marginVertical: 5,
        alignItems: "center"
    },
    errorText: {
        color: 'red',
        fontSize: 13
    }
});

export default InputCard;