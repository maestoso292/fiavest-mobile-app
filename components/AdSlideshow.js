import React from "react";
import { View, Text, StyleSheet } from "react-native";

// TODO Implement an autoplaying slideshow + touchable?
const AdSlideShow = (props) => {
  return (
    <View style={styles.container}>
      <Text>Ad SlideShow Placeholder</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdSlideShow;
