import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";

const Popup = (props) => {
  return (
    <Modal transparent {...props}>
      <View style={styles.modal}>
        <View style={{ ...styles.container, ...props.popupStyle }}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: 50,
    height: 50,
  },
});

export default Popup;
