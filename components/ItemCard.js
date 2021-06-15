import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const ItemCard = props => {

    let TouchComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.card}>
            <View style = {styles.cardCon}>
                <TouchComponent onPress={() => {}} useForeground >
                    <View>
                        <View style = {styles.imageCon}><Image style = {styles.image} source= {{uri: props.imageURL}}/></View>
                        <View style = {styles.text}>
                            <Text style={{fontSize: 25, marginBottom: 5}}>{props.title}</Text>
                            <Text style={{letterSpacing: 1}}>{props.details}</Text>
                        </View>
                    </View>
                </TouchComponent>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        //borderRadius: 10,
        backgroundColor: 'white',
        height: 250,
        width: '90%',
        margin: 20,
        overflow: 'hidden',
    },
    cardCon: {
        height: 250,
        //borderWidth: 1, 
        //borderColor: 'black',
    }, 
    imageCon: {
        width: '100%',
        height: '65%',
        //overflow: 'hidden',
        //borderWidth: 1,
        resizeMode: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        alignItems: 'center',
        height: '35%',
        padding: 10,
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //paddingHorizontal: 20
    }
});

export default ItemCard;