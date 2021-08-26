import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BORDER_PRIMARY, BACKGROUND_LIGHT, POPUP_LIGHT } from "../../constants/colors";

const TypeCalculator = (props) => {
  const [isPress, setIsPress] = useState(true);

  const pressHandler = () => {
    setIsPress(!isPress);
  };

  return (
    <View style={styles.mainCon}>
      <Pressable onPress={pressHandler}>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, color: "white" }}>{props.title}</Text>
          {isPress ? (
            <AntDesign name="caretright" size={24} color="white" />
          ) : (
            <AntDesign name="caretdown" size={24} color="white" />
          )}
        </View>
      </Pressable>
      {isPress ? (
        <View />
      ) : (
        <View style={{ alignItems: "center" }}>
          <View style={styles.insideCon}>{props.children}</View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderWidth: 2,
    borderColor: BORDER_PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "black",
  },
  insideCon: {
    justifyContent: "center",
    width: "90%",
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderColor: BORDER_PRIMARY,
    padding: 10,
    backgroundColor: "black",
  },
});

export default TypeCalculator;
