import React from "react";
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { BORDER_PRIMARY } from "../constants/colors";
import ModalPopup from "./ModalPopup";

const AdPopup = (props) => {
  return (
    <ModalPopup {...props} popupStyle={styles.popup} modalStyle={styles.modal}>
      <Image source={{ uri: props.source, width: "100%", height: "100%" }} />
      <View style={styles.button}>
        <TouchableWithoutFeedback onPress={props.onPress}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableWithoutFeedback>
      </View>
    </ModalPopup>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "black",
    opacity: 0.75,
  },
  popup: {
    width: "95%",
    // TODO Adjust height of ad. Should it be dynamic according to ad?
    height: "80%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 0,
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    textDecorationLine: "underline",
    color: "blue",
    textShadowColor: BORDER_PRIMARY,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
});

export default AdPopup;
