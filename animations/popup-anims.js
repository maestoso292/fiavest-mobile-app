import React from "react";
import { Animated } from "react-native";

const DEFAULT_DURATION = 150;

export const fade = (state, endValue, duration = DEFAULT_DURATION) => {
  return Animated.timing(state, {
    toValue: endValue,
    duration: duration,
    useNativeDriver: true,
  });
};
