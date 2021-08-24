import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const MyButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={[styles.button, props.style]}>
                <Text style={styles.text}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles=StyleSheet.create({
    button: {
        //marginTop: 32,
        backgroundColor: 'rgb(220,220,220)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        // borderWidth: 1,
        borderRadius: 12,
        alignItems:'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        backgroundColor: "#4885c7",
    },

    text: {
        color: 'black',
        backgroundColor: 'transparent',
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
});

export default MyButton;