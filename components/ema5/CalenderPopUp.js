import React, {useState} from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MyButton from "../MyButton";
import CalendarPicker from 'react-native-calendar-picker';
import ViewPopup from "../base/ViewPopup";

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;

const CalenderPopUp = (props) => {

    return (
        <View
            style={{ ...styles.popupContainer, ...props.containerStyle }}
            pointerEvents={props.visible ? "auto" : "none"}
        >
            <ViewPopup style={{ ...styles.popup, ...props.popupStyle }}>
                <CalendarPicker 
                    onDateChange={props.onChange}
                    textStyle={{
                        color: "white",
                        fontSize: 15,
                    }}
                    dayShape="square"
                    selectedDayStyle={{
                        backgroundColor: "skyblue"
                    }}
                />
                <MyButton onPress={props.onClose} style={{
                    marginTop: 25,
                    paddingHorizontal: 50,
                }}>CLOSE</MyButton>
            </ViewPopup>
            
        </View>
    )
}

const styles = StyleSheet.create({
    popupContainer: {
      position: "absolute",
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
    },
    popup: {
      width: "100%",
      height: "80%",
      backgroundColor: 'rgba(52, 52, 52, 1)',
      overflow: "hidden",
      alignItems: "center",
      justifyContent:"center",
    },
})

export default CalenderPopUp
