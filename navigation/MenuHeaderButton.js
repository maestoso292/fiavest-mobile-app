import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import TouchableCustom from "../components/base/TouchableCustom";

const MenuHeaderButton = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TouchableCustom
      activeOpacity={0.3}
      onPress={() => {
        navigation.navigate("Menu", { current: route.name });
      }}
      contentStyle={styles.button}
    >
      <Ionicons name="menu-outline" size={30} />
    </TouchableCustom>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
});

export default MenuHeaderButton;
