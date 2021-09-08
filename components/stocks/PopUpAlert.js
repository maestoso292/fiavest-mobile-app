import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { useHeaderHeight } from "@react-navigation/stack";
import ViewPopup from "../base/ViewPopup";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../../constants/colors";
import MyButton from "../MyButton";

export const SetAlertPopUp = (props) => {

    const [priceTarget, setPriceTarget] = useState();
    const [volumeTarget, setVolumeTarget] = useState();

    const resetFields = () => {
        setPriceTarget(null);
        setVolumeTarget(null);
    };
    
    const cancelHandler = () => {
        resetFields();
        props.onCancel();
    };

    const EnableSubmitHandler = (priceTarget, volumeTarget) => {
        resetFields();
        props.onSubmit(priceTarget, volumeTarget);
    };

    return (
        <KeyboardAvoidingView
            style={{
                ...styles.popupContainer,
                top: -useHeaderHeight(),
                ...props.containerStyle,
            }}
            pointerEvents={props.visible ? "auto" : "none"}
            // TODO Double check for correct behaviour on iOS devices
            behavior={Platform.select({ ios: "height", android: null })}
        >
            <ViewPopup style={{ ...styles.popup, ...props.popupStyle }}>
                <View style={styles.header}>
                    <Text style={styles.headerContent}>SET ALERT FOR <Text style={{fontWeight: "bold"}}>{props.stockId} {props.stockName}</Text></Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>When price hit:</Text>
                    <Text style={{ ...styles.inputText, marginLeft: 10 }}>MYR</Text>
                    <TextInput
                        style={styles.input}
                        value={priceTarget}
                        onChangeText={setPriceTarget}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>When volume hit:</Text>
                    <TextInput
                        style={styles.input}
                        value={volumeTarget}
                        onChangeText={setVolumeTarget}
                        keyboardType="number-pad"
                    />
                </View>
                <View
                style={styles.buttonContainer}>
                    <MyButton onPress={cancelHandler} >CANCEL</MyButton>
                    <MyButton onPress={() => EnableSubmitHandler(priceTarget, volumeTarget)}>SET</MyButton>
                </View>
            </ViewPopup>
        </KeyboardAvoidingView>
    )
}

export const DisableAlertPopUp = (props) => {

    const DisableSubmitHandler = () => {
        props.onSubmit();
    };

    const cancelHandler = () => {
        props.onCancel();
    };

    return (
        <KeyboardAvoidingView
            style={{
                ...styles.popupContainer,
                top: -useHeaderHeight(),
                ...props.containerStyle,
            }}
            pointerEvents={props.visible ? "auto" : "none"}
            // TODO Double check for correct behaviour on iOS devices
            behavior={Platform.select({ ios: "height", android: null })}
        >
            <ViewPopup style={{ ...styles.popup, ...props.popupStyle }}>
                <View
                style={{
                    ...styles.inputContainer,
                    width: "65%",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingHorizontal: 40,
                }}
                >
                    <Text style={styles.inputText}>
                        Are you sure you want to clear the alert of
                    </Text>
                    <Text style={styles.inputText}>
                        <Text style={{ fontWeight: "bold" }}>
                        {props.stockId} {props.stockName}
                        </Text>
                        ?
                    </Text>
                </View>
                <View
                style={styles.buttonContainer}>
                <MyButton onPress={cancelHandler} >CANCEL</MyButton>
                <MyButton onPress={DisableSubmitHandler} >CLEAR</MyButton>
                </View>
            </ViewPopup>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    popupContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        borderRadius: 20,
        backgroundColor: POPUP_LIGHT,
        overflow: "hidden",
        width: "90%",
        alignItems: "center",
    },
    header: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: BORDER_PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    headerContent: {
        fontSize: 20,
        letterSpacing: 1,
    },
      inputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        padding: 10,
    },
      inputText: {
        fontWeight: "bold",
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        textAlign: "center",
        marginLeft: 5,
    },
    buttonContainer: {
        width: "90%",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 30,
    }
});