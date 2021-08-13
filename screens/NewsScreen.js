import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { StyleSheet, View, Text, Linking, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import YoutubePlay from 'react-native-youtube-iframe';

const NewsScreen = () => {

    // const [testData, setTest] = useState([])

    const test = async() => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/todos/1').then(
                responce => responce.json()).then(json => console.log(json))
            // const value = await AsyncStorage.getItem("userData");
            // var item = JSON.parse(value)
            // if (value !== null) {
            //     console.log(item.token)
            //     const responce = await fetch(`https://graph.facebook.com/1905935872934250`);
            //     const value = await responce.json();
            //     console.log(value)
            //     const responce = await fetch(`https://graph.facebook.com/${item.userId}?fields=name,id&access_token=${item.token})`);
            //     const { name, id } = await responce.json();
            //     console.log(name)
            // }
        } catch(err) {
            console.log(err)
        }
        // const responce = await fetch("https://graph.facebook.com/facebook/picture?redirect=false");
    }

    return (
        <View style={styles.container}>
            <Text onPress={() => Linking.openURL('http://google.com') } >ok</Text>
            <Button title="Test" onPress={test} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    youtubeCon: {
        width: 200,
        height: 300,
    }
});

export default NewsScreen;