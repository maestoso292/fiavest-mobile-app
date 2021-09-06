import React, {useState, useEffect, useRef, useCallback} from 'react';
import { StyleSheet, View, Text, Animated, Keyboard, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { fade } from "../animations/popup-anims";

import ImgContainer from '../components/ema5/ChartContainer';
import MyButton from '../components/MyButton';
import CalenderPopUp from '../components/ema5/CalenderPopUp';
import { BORDER_PRIMARY } from '../constants/colors';


const DEVICE_WIDTH = Dimensions.get("window").width;

const EMA5Screen = props => {

    var today = new Date();
    var subToday = today.toISOString().substr(0, 10)
    
    const [date, setDate] = useState(subToday)
    const [ChartInfo, setChart] = useState([])
    const [popupVisible, setPopupVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [totalCharts, setTotalCharts] = useState()
    const [numPage, setNumPage] = useState(0)

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const getCharts = async () => {
        setIsLoading(true)
        const response = await fetch(
            `https://fiavest-plus-app-api.fiavest.com/api/public/ema5/fetchDate?chartDate=${date}`,
            {
                method: "GET",
            }
        );
        if (!response.ok) {
            const errorResData = await response.json();
            console.log(errorResData.error.message);
        } else {
            const ResData = await response.json();
            // console.log(ResData.length);
            setTotalCharts(ResData.length);
            // console.log(ResData);
            setIsLoading(false)
            return ResData;
        }
    }

    const dateHandler = (date) => {
        // console.log(date.toISOString());
        var subDate = date.toISOString().substr(0, 10);
        setDate(subDate);
        closePopup();
    }

    useEffect(() => {
        let endValue = popupVisible ? 1 : 0;
        fade(fadeAnim, endValue).start();
      }, [popupVisible]);
    
      useFocusEffect(
        useCallback(() => {
          setPopupVisible(false);
        }, [setPopupVisible])
      );
    
      const closePopup = () => {
        Keyboard.dismiss();
        setPopupVisible(false);
      };
    
      const openPopup = () => {
        setPopupVisible(true);
      };

      useEffect(() => {
          const getAllCharts = async () => {
              const allChart = await getCharts();
              if(allChart) {
                  setChart(allChart)
              } else {
                  setChart([])
              }
          };
          getAllCharts();
        //   console.log(ChartInfo[0].chartDate);
      }, [date])

    //   console.log(ChartInfo[0].pieImg);
    return (
        <View style={styles.screen}>
            {isLoading ? <ActivityIndicator size="large" color="white" /> : 
            <View style={styles.container}>
                <MyButton onPress={openPopup} style={{paddingHorizontal: 60}}>Choose Date</MyButton>
                <Text style={styles.dateText}>DATE : {date}</Text>
                {ChartInfo.length === 0 ? 
                <View style={styles.NoChartCon}>
                    <Text style={{color: "white", fontSize: 26}}>No Chart On That Day...</Text>
                </View> : 
                <ScrollView contentContainerStyle={styles.ScrollCon}>
                    <ImgContainer
                    source={totalCharts > 1 ? (ChartInfo[numPage].pieImg) : (ChartInfo[0].pieImg)}
                    title={totalCharts > 1 ? (ChartInfo[numPage].pieName) : (ChartInfo[0].pieName)}
                    />
                    <ImgContainer 
                    source={totalCharts > 1 ? (ChartInfo[numPage].lineImg) : (ChartInfo[0].lineImg)}
                    title={totalCharts > 1 ? (ChartInfo[numPage].lineName) : (ChartInfo[0].lineName)}
                    />

                    {totalCharts > 1 ? 
                    <View style={styles.buttonContainer}>
                        {numPage === 0 ? <View style={{width: 120}}></View> : <MyButton style={{width: 120}} onPress={() => {
                            setNumPage(numPage - 1)
                        }} >Previous</MyButton>}
                        <View style={{borderWidth: 2, borderColor:"white", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10}}>
                            <Text style={{color: "white", fontSize: 22}}>{numPage + 1}</Text>
                        </View>
                        {numPage + 1 === totalCharts ? <View style={{width: 120}}></View> : <MyButton style={{width: 120}} onPress={() => {
                            setNumPage(numPage + 1)
                        }}>Next</MyButton>}
                    </View> : <></>}
                </ScrollView>
                }
            </View>
            }
            
            <CalenderPopUp 
            visible={popupVisible}
            onChange={dateHandler}
            onClose={closePopup}
            popupStyle={{opacity : fadeAnim}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "black",
    },
    container: {
        flex: 1,
        width: DEVICE_WIDTH,
        alignItems: "center",
    },
    dateText: {
        marginVertical: 10,
        color: "white",
        fontSize: 18,
    },
    ScrollCon: {
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        width: DEVICE_WIDTH,
    },
    NoChartCon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        paddingVertical: 100,
        paddingHorizontal: 15
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
    }
});

export default EMA5Screen;