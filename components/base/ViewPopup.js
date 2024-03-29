import React from "react";
import { StyleSheet, Animated } from "react-native";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../../constants/colors";

const ViewPopup = (props) => {
  return (
    <Animated.View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: POPUP_LIGHT,
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
});

export default ViewPopup;
