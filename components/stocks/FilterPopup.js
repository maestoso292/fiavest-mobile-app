import { hidden } from "ansi-colors";
import React, { useCallback, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import { POPUP_LIGHT } from "../../constants/colors";
import ViewPopup from "../base/ViewPopup";
import MyButton from "../MyButton";
import FilterNumberInput from "./FilterNumberInput";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const FILTER_MIN_UPDATE = "FILTER_MIN_UPDATE";
const FILTER_MAX_UPDATE = "FILTER_MAX_UPDATE";
const FILTER_RESET = "FILTER_RESET";

const initialFilterState = {
  min: {
    yPrice: null,
    share: null,
    ltValue: null,
  },
  max: {
    yPrice: null,
    share: null,
    ltValue: null,
  },
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case FILTER_MIN_UPDATE:
      const updatedMin = {
        ...state.min,
        [action.input]: action.value,
      };
      return {
        min: updatedMin,
        max: state.max,
      };
    case FILTER_MAX_UPDATE:
      const updatedMax = {
        ...state.max,
        [action.input]: action.value,
      };
      return {
        min: state.min,
        max: updatedMax,
      };
    case FILTER_RESET: {
      return initialFilterState;
    }
    default:
      return state;
  }
};

// TODO Filter reset
const FilterPopup = (props) => {
  const [filterState, dispatchFilterState] = useReducer(
    filterReducer,
    initialFilterState
  );

  const inputChangeHandler = useCallback(
    (type, id, value) => {
      console.log(`${type} : ${id} : ${value}`);
      dispatchFilterState({ type: type, input: id, value: value });
    },
    [dispatchFilterState]
  );

  // useEffect(() => {
  //   dispatchFilterState({type: FILTER_RESET})
  // }, [props.visible])

  return (
    <View
      style={{ ...styles.popupContainer, ...props.containerStyle }}
      pointerEvents={props.visible ? "box-none" : "none"}
    >
      <ViewPopup style={{ ...styles.popup, ...props.popupStyle }}>
        <View style={{ ...styles.row, flex: 0.5 }}>
          <View style={styles.column1}></View>
          <View style={styles.column2}>
            <Text style={{color: "white"}}>Min</Text>
          </View>
          <View style={styles.column2}>
            <Text style={{color: "white"}}>Max</Text>
          </View>
        </View>
        <InputRow
          name="YPrice :"
          id="yPrice"
          onInputChange={inputChangeHandler}
        />
        <InputRow
          name="Share(M) :"
          id="share"
          onInputChange={inputChangeHandler}
        />
        <InputRow
          name="LT Value(K) :"
          id="ltValue"
          onInputChange={inputChangeHandler}
        />
        <View style={styles.row}>
          <MyButton onPress={() => props.onSubmit(filterState)}>
            SAVE
          </MyButton>
        </View>
      </ViewPopup>
    </View>
  );
};

const InputRow = (props) => {
  return (
    <View style={styles.row}>
      <View style={styles.column1}>
        <Text style={{fontSize: 16, color: "white"}}>{props.name}</Text>
      </View>
      <View style={styles.column2}>
        <FilterNumberInput
          id={props.id}
          onInputChange={props.onInputChange.bind(this, FILTER_MIN_UPDATE)}
        />
      </View>
      <View style={styles.column2}>
        <FilterNumberInput
          id={props.id}
          onInputChange={props.onInputChange.bind(this, FILTER_MAX_UPDATE)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    width: "100%",
    height: DEVICE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "85%",
    height: "40%",
    borderRadius: 30,
    backgroundColor: "#454545",
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  row: {
    marginVertical: 3,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column1: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  column2: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FilterPopup;
