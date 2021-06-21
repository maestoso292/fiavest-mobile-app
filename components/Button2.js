import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Button2 = props => {
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
        width: 100,
        //marginTop: 32,
        backgroundColor: '#ccc',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems:'center',
    },

    text: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Button2;