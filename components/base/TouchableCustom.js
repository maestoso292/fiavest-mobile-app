import React from "react";
import {
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

const TouchableCustom = (props) => {
  let TouchableComponent;
  switch (props.type) {
    case "opacity":
      TouchableComponent = TouchableOpacity;
      break;
    case "highlight":
      TouchableComponent = TouchableHighlight;
      break;
    default:
      TouchableComponent = TouchableWithoutFeedback;
      break;
  }
  // Option to enable using native touchable for Android
  if (props.useAndroid && Platform.OS === "android") {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    // Not necessary to use containerStyle in other components. Provided for convenience and alternatives.
    <View style={{ ...styles.touchableContainer, ...props.containerStyle }}>
      <TouchableComponent
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        onPress={props.onPress}
        useForeground
        {...props}
        style={{ ...styles.touchable, ...props.touchableStyle }}
      >
        {/* Some RN Touchables require exactly 1 React child component so this custom touchable automatically provides this.*/}
        <View style={{ ...styles.content, ...props.contentStyle }}>
          {props.children}
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
  },
  touchable: {
  },
  content: {
  }
});

export default TouchableCustom;
