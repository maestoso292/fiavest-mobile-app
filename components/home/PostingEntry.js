import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import TouchableCustom from "../base/TouchableCustom";
import {
  BORDER_PRIMARY,
  POPUP_LIGHT,
  TEXT_PRIMARY_LIGHT,
} from "../../constants/colors";

import CardBase from "../base/CardBase";

const PostingCard = (props) => {
  return (
    <CardBase style={styles.rootContainer}>
      <TouchableCustom
        type="highlight"
        useAndroid
        containerStyle={{width: "100%", flex: 1}}
        contentStyle={{ width: "100%", flex: 1}}
        onPress={() => {}}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.source }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{props.name}</Text>
          <Text style={styles.bodyText}>{props.details}</Text>
        </View>
      </TouchableCustom>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    height: 250,
    marginVertical: 5,
    alignItems: "center",
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
  textContainer: {
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
  bodyText: {
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default PostingCard;
