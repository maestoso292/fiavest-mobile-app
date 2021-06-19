import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const CustomButton = props => {

    let TouchComponent = TouchableOpacity;

    {/* if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchComponent = TouchableNativeFeedback;
    } */}

    return (
        <View style={styles.outline}>
            <TouchComponent onPress={props.onPress} useForeground >
                <Image
                style={styles.img}
                {...props}
                />
            </TouchComponent>
            
        </View>
    )

};

const styles = StyleSheet.create({
    outline: {
        //borderWidth: 1,
        borderRadius: 15,
        height: 60,
        width: 60,
        overflow: 'hidden',
        //marginHorizontal: 50
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'center',
    }
});

export default CustomButton;