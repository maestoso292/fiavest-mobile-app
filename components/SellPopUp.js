import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Popup from './Popup';
import Button2 from './Button2';
import { Picker } from "@react-native-picker/picker";

const SellPopUp = (props) => {

    const [brokerage, setBrokerage] = useState();
    const [payment, setPayment] = useState();

    return (
        <Popup {...props} popupStyle={styles.popupCon} modalStyle={styles.modal} >
            <View style={styles.picker}>
                <Text>Brokerage : </Text>
                <Picker
                    selectedValue={brokerage}
                    style={{ height: 30, width: 150}}
                    onValueChange={(itemValue) => setBrokerage(itemValue)}
                >
                    <Picker.Item label="Malacca Securities Sdn Bhd" value="Malacca" />
                    <Picker.Item label="Test 2" value="test 2" />
                    <Picker.Item label="Test 3" value="test 3" />
                    <Picker.Item label="Test 4" value="test 4" />
                </Picker>
            </View>
            <View style={styles.inputCon}>
                <Text>Lot (x100) : </Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.inputCon}>
                <Text>Total (RM) : </Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.picker}>
                <Text>Brokerage : </Text>
                <Picker
                    selectedValue={payment}
                    style={{ height: 30, width: 150}}
                    onValueChange={(itemValue) => setPayment(itemValue)}
                >
                    <Picker.Item label="Maybank 2U" value="Maybank" />
                    <Picker.Item label="Test 2" value="test 2" />
                    <Picker.Item label="Test 3" value="test 3" />
                    <Picker.Item label="Test 4" value="test 4" />
                </Picker>
            </View>
            <View style={styles.buttonCon}>
                <Button2 onPress={() => {}}>Sell</Button2>
                <Button2 onPress={props.onClose}>Close</Button2>
            </View>
        </Popup>
    )
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "black",
        opacity: 0.8,
    },
    popupCon: {
        width: '70%',
        // TODO Adjust height of ad. Should it be dynamic according to ad?
        height: '45%',
        padding: 15,
        borderRadius: 10
    },
    buttonCon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    picker: {
        width: '100%',
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputCon: {
        width: '100%',
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        width: 150,
        borderBottomWidth: 1
    }
});

export default SellPopUp