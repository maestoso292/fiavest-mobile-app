import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ImgContainer from '../components/ChartContainer';

const EMA5Screen = props => {

    const chartData = () => {
        return "https://cdn.jifo.co/js/dist/47cbeeecd293d1e81b265686cd6a1c2c.jpg"
    };

    const lineData = () => {
        return "https://www.investopedia.com/thmb/hFd5f6CHYnWgh0TRRhCGSN-P4m0=/3230x3230/smart/filters:no_upscale()/dotdash_INV_Final_Line_Chart_Jan_2021-01-d2dc4eb9a59c43468e48c03e15501ebe.jpg"
    }

    return (
        <View style={styles.container}>
            <ImgContainer 
            source={chartData()}
            title="Pie Chart"
            onPress={() => alert("Pie")}
            />
            <ImgContainer 
            source={lineData()}
            title="Line Chart"
            onPress={() => alert("Line")}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "black"
    }
});

export default EMA5Screen;