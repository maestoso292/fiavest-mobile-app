import React from "react";
import { View, StyleSheet } from "react-native";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../../constants/colors";

const CardBase = (props) => {
  return (
    <View style={{ ...styles.rootContainer, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: POPUP_LIGHT,
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 2,
    overflow: "hidden",
  },
});

export default CardBase;
