import React from "react";
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import Popup from "./Popup";

const AdPopup = (props) => {
  return (
    <Popup {...props} popupStyle={styles.popup} modalStyle={styles.modal}>
      <Image source={{ uri: props.source, width: "100%", height: "100%" }} />
      <View style={styles.button}>
        <TouchableWithoutFeedback onPress={props.onPress}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableWithoutFeedback>
      </View>
    </Popup>
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
    fontSize: 16,
    textDecorationLine: "underline",
    color: "blue",
  },
});

export default AdPopup;
