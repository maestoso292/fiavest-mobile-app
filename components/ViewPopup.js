import React, { useEffect, useRef } from "react";
import { View, Modal, StyleSheet, Animated } from "react-native";
import { BORDER_PRIMARY, POPUP_LIGHT } from "../constants/colors";

const ViewPopup = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  return (
    <Animated.View
      style={{ ...styles.container, ...props.style }}
    >
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
    width: 50,
    height: 50,
  },
});

export default ViewPopup;
