import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BORDER_PRIMARY } from '../../constants/colors';

const OutputCon = props => {
    return (
        <View style={styles.container}>
            <Text style={{width: '50%', fontWeight: 'bold'}}>{props.title}</Text>
            <Text style={styles.text}>{props.value}</Text>
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
    text: {
        fontWeight: 'bold', 
        borderBottomWidth: 1, 
        borderColor: BORDER_PRIMARY,
        width: '30%',
        textAlign: 'center'
    }
})

export default OutputCon;