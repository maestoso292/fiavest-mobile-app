import React, { Component, createRef } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import { BORDER_PRIMARY } from "../constants/colors";

const DEVICE_WIDTH = Dimensions.get("window").width;

class ImageSwiper extends Component {
  scrollRef = createRef();

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState(
        (prev) => ({
          selectedIndex:
            prev.selectedIndex === this.props.images.length - 1
              ? 0
              : prev.selectedIndex + 1,
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            y: 0,
            x: DEVICE_WIDTH * this.state.selectedIndex,
          });
        }
      );
    }, 3000);
  };

  setSelectedIndex = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.floor(contentOffset / viewSize);
    this.setState({ selectedIndex });
  };

  render() {
    const { images } = this.props;
    const { selectedIndex } = this.state;
    return (
      <View style={styles.imageCon}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
          decelerationRate={0}
          snapToAlignment={"center"}
          snapToInterval={DEVICE_WIDTH}
        >
          {images.map((image) => (
            <Image style={styles.image} key={image} source={{ uri: image }} />
          ))}
        </ScrollView>
        <View style={styles.dotContainer}>
          {images.map((image, i) => (
            <View
              key={image}
              style={[styles.dot, { opacity: i === selectedIndex ? 1 : 0.7 }]}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageCon: {
    height: "20%",
    width: "95%",
    marginTop: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_PRIMARY,
    overflow: "hidden",
    //backgroundColor: '#C3C3C3',
  },
  image: {
    height: "100%",
    width: DEVICE_WIDTH,
    resizeMode: "cover",
  },
  dotContainer: {
    position: "absolute",
    bottom: 15,
    height: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
  },
});

export { ImageSwiper };
