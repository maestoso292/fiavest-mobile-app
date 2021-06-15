import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const MyButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles=StyleSheet.create({
    button: {
        width: 150,
        //marginTop: 32,
        backgroundColor: '#ccc',
        padding: 10,
        borderWidth: 1,
        borderRadius: 100,
        alignItems:'center',
    },

    text: {
        color: 'black',
        fontSize: 18,
    },
});

export default MyButton;