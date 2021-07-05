import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { BACKGROUND_LIGHT } from '../../constants/colors';

const TypeCalculator = props => {

    const [isPress, setIsPress] = useState(true);

    const pressHandler = () => {
        setIsPress(!isPress)
    };

    return (
        <View style={styles.mainCon}>
            <Pressable onPress={pressHandler}>
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>{props.title}</Text>
                    {isPress ? (
                        <AntDesign name="caretright" size={24} color="black" />
                    ) : (
                        <AntDesign name="caretdown" size={24} color="black" />
                    )}
                </View>
            </Pressable>
            {isPress ? (
                <View />
            ): (
            <View style={{alignItems: 'center'}}>
                <View style={styles.insideCon}>
                    {props.children}
                </View>
            </View>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    mainCon: {
        justifyContent: 'center',
        //alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    insideCon: {
        justifyContent: 'center',
        //alignItems: 'center',
        width: '90%',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 10,
        backgroundColor: BACKGROUND_LIGHT
    },
});

export default TypeCalculator;