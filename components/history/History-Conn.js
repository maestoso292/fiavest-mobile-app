import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const HistoryContainer = props => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentCon}>
                <View style={{width: '20%', alignItems: 'flex-start'}}>
                    <Text style={{fontSize: 15}}>{props.date}</Text>
                </View>
                <View style={{width: '50%', alignItems: 'flex-start'}}>
                    <Text style={{fontSize: 15}}>{props.name}</Text>
                </View>
                <View style={{width: '20%', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{props.total}</Text>
                </View>
            </View>
            <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => alert("Print")}
            >
                <AntDesign name="printer" size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#BFBFBF",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 15,
        marginVertical: 10
    },
    contentCon: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        alignItems: 'center',
    }
})

export default HistoryContainer;