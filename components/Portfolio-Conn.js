import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CheckBox from "@react-native-community/checkbox";

const Container = props => {

    const [isSell, setIsSell] = useState(false);

    return(
        <View style={styles.container}>
            <View style={styles.idAndSlot}>
                <Text style={{fontSize: 18}}>{props.name}</Text>
                <Text style={{fontSize: 18}}>{props.lots}</Text>
            </View>
            <View style={styles.textCon}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>{props.price}</Text>
            </View>
            <View style={styles.checkBok}>
                <CheckBox 
                disabled={false}
                value={isSell}
                onValueChange={(newValue) => setIsSell(newValue)}  // OR props.onSelect
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: 'flex-start',
        height: 50,
        flexDirection: 'row',
    },
    idAndSlot: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 12,
        borderWidth: 1,
    },
    textCon: {
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