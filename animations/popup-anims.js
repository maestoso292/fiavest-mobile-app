import React from "react";
import { Animated } from "react-native";

export const fade = (state, endValue) => {
  return Animated.timing(state, {
    toValue: endValue,
    duration: 150,
    useNativeDriver: true,
  });
};
