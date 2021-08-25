import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CheckBox from "@react-native-community/checkbox";
import { BACKGROUND_LIGHT, BORDER_PRIMARY, POPUP_LIGHT } from '../../constants/colors';

const Container = props => {

    const [isSell, setIsSell] = useState(false);

    return(
        <View style={styles.rootContainer}>
            <View style={styles.idAndNameContainer}>
                <Text style={{fontSize: 18, color: "white"}}>{props.name}</Text>
                <Text style={{fontSize: 18, color: "white"}}>{props.lots}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: "white"}}>{props.price}</Text>
            </View>
            <View style={styles.checkBok}>
                <CheckBox 
                disabled={false}
                value={isSell}
                tintColors={{true: "white", false: "white"}}
                tintColor="white"
                onTintColor="white"
                onFillColor="white"
                onValueChange={(newValue) => setIsSell(newValue)}  // OR props.onSelect
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 20,
        justifyContent: 'flex-start',
        height: 50,
        flexDirection: 'row',
    },
    idAndNameContainer: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderRadius: 15,
        padding: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: BORDER_PRIMARY,
        backgroundColor: "#454545",
        shadowColor: "black",
        shadowOpacity: 0.75,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    priceContainer: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBok: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Container;