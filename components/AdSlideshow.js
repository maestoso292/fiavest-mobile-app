import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import useComponentSize from "../hooks/layout-hooks";

const renderAd = ({ item, index }) => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: item }} />
    </View>
  );
};

// TODO Transitions are a little buggy
const AdSlideShow = (props) => {
  const [ads, setAds] = useState(props.data);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [size, onLayout] = useComponentSize();

  return (
    <View style={styles.container} onLayout={onLayout}>
      {size != null && (
        <View style={{ width: size.width }}>
          <Carousel
            // TODO Should scrolling animation be changed?
            data={ads}
            renderItem={renderAd}
            sliderWidth={size.width}
            itemWidth={size.width}
            firstItem={0}
            onSnapToItem={setCurrentAdIndex}
            decelerationRate="fast"
            loop
            autoplay
            // TODO Exact delays to be decided
            autoplayDelay={1000}
            autoplayInterval={2000}
            scrollEnabled={false}
            activeAnimat
            // TODO May want to use ScrollView since FlatList may be buggy
            // useScrollView
          />
          <Pagination
            dotsLength={ads.length}
            activeDotIndex={currentAdIndex}
            containerStyle={styles.pagination}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.8}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 150,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    overflow: "hidden",
    alignItems: "center",
  },
  pagination: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0)",
    bottom: 0,
    width: "100%",
    paddingBottom: 10,
    paddingTop: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
});

export default AdSlideShow;
