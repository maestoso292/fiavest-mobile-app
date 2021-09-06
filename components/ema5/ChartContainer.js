import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import { BORDER_PRIMARY } from '../../constants/colors';

const ImgContainer = props => {

    let TouchComponent = TouchableOpacity;
        if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchComponent = TouchableNativeFeedback;
    }

    return (
        <TouchComponent activeOpacity={0.75} useForeground onPress={props.onPress} style={{
            borderWidth: 1,
            borderColor: "white"
            }}>
            <View style={styles.imgCon}>
                <Image source={{ uri: `data:image/jpeg;base64,${props.source}`, width: "100%", height: "90%" }}/>
                <View style={styles.textCon}>
                    <Text style={{fontSize: 20, color: "white"}}>{props.title}</Text>
                </View>
            </View>
        </TouchComponent>
    )
};

const styles = StyleSheet.create({
    imgCon: {
        width: '90%',
        height: 280,
        borderWidth: 2,
        borderColor: "#454545",
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginBottom: 10,
    },
    textCon: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#454545",
        paddingVertical: 10
    }
});

export default ImgContainer;