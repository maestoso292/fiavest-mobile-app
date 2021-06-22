import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import { BORDER_PRIMARY } from '../constants/colors';

const ImgContainer = props => {

    let TouchComponent = TouchableOpacity;
        if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchComponent = TouchableNativeFeedback;
    }

    return (
        <TouchComponent activeOpacity={0.75} useForeground onPress={props.onPress}>
            <View style={styles.imgCon}>
                <Image source={{ uri: props.source, width: "100%", height: "90%" }}/>
                <View style={styles.textCon}>
                    <Text style={{fontSize: 20}}>{props.title}</Text>
                </View>
            </View>
        </TouchComponent>
    )
};

const styles = StyleSheet.create({
    imgCon: {
        width: '95%',
        height: 250,
        borderWidth: 1,
        borderColor: BORDER_PRIMARY,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginBottom: 30
    },
    textCon: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ImgContainer;