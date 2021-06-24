import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { BORDER_PRIMARY } from "../../constants/colors";

const ModalPopup = (props) => {
  return (
    <Modal transparent {...props}>
        <View style={{ ...styles.modal, ...props.modalStyle }}>
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderColor: BORDER_PRIMARY,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    width: 50,
  },
});

export default ModalPopup;
