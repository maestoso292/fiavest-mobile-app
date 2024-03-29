import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {BACKGROUND_LIGHT, BORDER_PRIMARY} from '../../constants/colors';

const HistoryCon = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.textCon}>
                <Text style={{fontWeight: 'bold', fontSize: 24, color: "white"}}>{props.title}</Text>
            </View>
            <View>
                {props.children}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        padding: 10,
        // borderColor: BORDER_PRIMARY,
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: { width: 2, height: 2 },
        // shadowRadius: 8,
        // elevation: 2,
    },
    textCon: {
        width: '100%',
        height: 30,
        //borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default HistoryCon;