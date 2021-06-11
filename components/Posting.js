import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Posting = (props) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.source }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text>{props.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
        width: "100%",
      marginVertical: 5,
    padding: 10,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  imageContainer: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
  },
  textContainer: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 10,
  },
});

export default Posting;
