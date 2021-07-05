import React from "react";
import { StyleSheet, View } from "react-native";
import TextButton from "../base/TextButton";
import { BORDER_PRIMARY, BUTTON_BG_LIGHT } from "../../constants/colors";

const ButtonCon = (props) => {
  return (
    <View style={styles.rootContainer}>
      <TextButton
        text="Reset"
        onPress={props.onClear}
        containerStyle={styles.buttonContainer}
      />
      <TextButton
        text="Calculate"
        onPress={props.onCalculate}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    width: "40%",
  },
});

export default ButtonCon;
