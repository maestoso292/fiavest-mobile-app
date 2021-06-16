import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import {
  BORDER_PRIMARY,
  POPUP_LIGHT,
  TEXT_PRIMARY_LIGHT,
} from "../constants/colors";

const Posting = (props) => {
  let TouchComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchComponent = TouchableNativeFeedback;
  }

  return (
    <TouchComponent activeOpacity={0.75} useForeground>
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.source }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{props.name}</Text>
      </View>
      </View>
      </TouchComponent>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: 200,
    marginVertical: 5,
    alignItems: "center",
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    flex: 4,
    width: "100%",
    overflow: "hidden",
    resizeMode: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    borderTopColor: BORDER_PRIMARY,
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 10,
    backgroundColor: POPUP_LIGHT,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: TEXT_PRIMARY_LIGHT,
  },
});

export default Posting;
