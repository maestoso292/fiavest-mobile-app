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

const PostingCard = (props) => {
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
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>{props.name}</Text>
          <Text style={styles.bodyText}>{props.details}</Text>
        </View>
        {/* <View style={styles.bodyTextContainer}>
          
        </View> */}
      </View>
    </TouchComponent>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: 250,
    marginVertical: 5,
    alignItems: "center",
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 3,
    width: "100%",
    overflow: "hidden",
    resizeMode: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleTextContainer: {
    // height: 42,
    flex: 2,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderTopColor: BORDER_PRIMARY,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: POPUP_LIGHT,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: TEXT_PRIMARY_LIGHT,
  },
  bodyTextContainer: {
    flex: 2,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: POPUP_LIGHT,
  },
  bodyText: {
    fontSize: 14,
    letterSpacing: 1
  },
});

export default PostingCard;
