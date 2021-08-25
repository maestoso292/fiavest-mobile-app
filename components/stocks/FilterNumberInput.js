import React, { useCallback, useEffect, useReducer, useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";

const FilterNumberInput = (props) => {
  //const [inputState, dispatch] = useReducer(inputReducer, { value: null });
  const [inputState, setInputState] = useState();

  const { id, onInputChange, visible} = props;

  const inputChangeHandler = (input) => {
    if (input === "") {
      input = null;
    }
    setInputState(input);
    onInputChange(id, input);
  };

  return (
    <TextInput
      keyboardType="number-pad"
      {...props}
      style={styles.input}
      value={inputState}
      onChangeText={inputChangeHandler}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    width: "80%",
    textAlign: "center",
    paddingHorizontal: 5,
    color: "white"
  },
});

export default FilterNumberInput;
