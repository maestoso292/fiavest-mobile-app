import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const OutputCon = props => {
    return (
        <View style={styles.container}>
            <Text style={{width: '50%'}}>{props.title}</Text>
            <Text style={{fontWeight: 'bold'}}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
})

export default OutputCon;