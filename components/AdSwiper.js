import React, { Component, createRef } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get("window").width;

class ImageSwiper extends Component {

    scrollRef = createRef();

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex : 0
        };
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState(prev => ({ selectedIndex: prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1 }),
            () => {
                this.scrollRef.current.scrollTo({
                    animated: true,
                    y: 0,
                    x: DEVICE_WIDTH * this.state.selectedIndex
                })
            })
        }, 3000)
    }

    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;

        const selectedIndex = Math.floor(contentOffset / viewSize)
        this.setState({ selectedIndex })

    }

    render() {
        const {images} = this.props;
        const {selectedIndex} = this.state;
        return (
            <View style={styles.imageCon}>
                <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false} 
                onMomentumScrollEnd={this.setSelectedIndex}
                ref={this.scrollRef}
                >
                    {images.map(image => (
                        <Image 
                            style={styles.Image}
                            key={image}
                            source={{uri: image}}
                        />
                    ))}
                </ScrollView>
                <View style={styles.circleCon}>
                    {images.map((image, i) => (
                        <View 
                            key={image}
                            style={[styles.whiteCircle, {opacity: i === selectedIndex ? 0.5 : 1}]}
                        />
                    ))}
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    imageCon: {
        height: "30%",
        width: "95%",
        marginTop: 32,
        borderRadius: 12,
        //borderWidth: 1, 
        //borderColor: 'black',
        overflow: 'hidden',
        //backgroundColor: '#C3C3C3',
    },
    Image: {
        height : "100%",
        width: DEVICE_WIDTH,
        resizeMode: 'cover',
    },
    circleCon: {
        position: 'absolute',
        bottom: 15,
        height: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteCircle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: "#C3C3C3",
    }

});

export { ImageSwiper };