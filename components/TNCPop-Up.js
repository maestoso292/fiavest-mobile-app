import React from 'react'
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native'
import CheckBox from "@react-native-community/checkbox";
import ViewPopup from './base/ViewPopup';
import { POPUP_LIGHT } from '../constants/colors';
import MyButton from './MyButton';

const DEVICE_HEIGHT = Dimensions.get("window").height;

const TNCPopUp = (props) => {

    return (
        <View
        style={{...styles.popCon, ...props.conStyle}}
        pointerEvents={props.visible ? "auto" : "none"}
        >
            <ViewPopup style={{...styles.popup, ...props.popupStyle}}>
                <Text style={styles.termTitle}>Term & Condition</Text>
                <ScrollView contentContainerStyle={{alignItems: "center"}}>
                    <Text style={styles.termContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae arcu at dui fringilla dapibus. Fusce sollicitudin velit lacus, sodales suscipit tellus vulputate quis. Suspendisse et urna ipsum. Cras sed eleifend turpis. Proin porta, turpis vel consequat mattis, elit nulla laoreet sem, sit amet tempor dolor ante sit amet purus. Quisque eleifend pellentesque magna sit amet fermentum. Praesent bibendum ipsum justo, vel ullamcorper ipsum sagittis vel. Integer euismod sagittis neque. Sed vitae purus leo.

Nullam erat enim, lobortis ut diam at, posuere placerat elit. Curabitur venenatis imperdiet congue. Integer convallis risus mi, et lobortis diam volutpat at. Vestibulum eget accumsan orci, tempor tempor nibh. Mauris consectetur justo vel lectus posuere, in dapibus ante scelerisque. Donec ultrices pellentesque mauris, ac maximus dolor. Etiam laoreet aliquet odio, at ullamcorper tellus interdum et. Praesent risus dolor, maximus at turpis at, facilisis accumsan turpis. Morbi eu tellus ut diam ultrices ultricies in eget nisi.

Sed nec nulla neque. Phasellus eget rutrum lectus, vitae rhoncus tellus. Nullam vitae enim fermentum, varius dui id, ullamcorper augue. Quisque id lobortis dolor, sed rutrum lacus. Duis eu mauris iaculis, varius sem quis, molestie dui. Sed vulputate laoreet nibh non efficitur. Phasellus varius eu eros ut interdum. Aenean efficitur.</Text>
                    <View style={styles.buttonCon}>
                        <MyButton onPress={props.onClose} >I Understand and Agree</MyButton>
                    </View>
                </ScrollView>
            </ViewPopup>
        </View>
    )
}

const styles = StyleSheet.create({
    popCon: {
        position: "absolute",
        width: "100%",
        height: DEVICE_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        width: "85%",
        height: "65%",
        borderRadius: 20,
        backgroundColor: POPUP_LIGHT,
        overflow: "hidden",
        padding: 15,
    },
    termTitle: {
        borderWidth: 3,
        textAlign: "center",
        fontSize: 22,
        paddingVertical: 10,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderRadius: 10,
    },
    termContent: {
        textAlign: "center",
        marginTop: 20,
        paddingHorizontal: 15
    },
    buttonCon: {
        marginTop: 20,
        marginBottom: 30
    }
})

export default TNCPopUp
