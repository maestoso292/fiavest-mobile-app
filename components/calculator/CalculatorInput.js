import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

const InputCon = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput 
            {...props}
            style={styles.input} 
            keyboardType="numeric"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    input: {
        width: "50%",
        borderBottomWidth: 1,
        borderColor: "white",
        color: "white"
    },
    title: {
        color: "white",
        fontSize: 14,
    },
});

export default InputCon;