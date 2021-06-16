import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MenuHeaderButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate("Menu");
      }}
    >
      <View style={{ paddingLeft: 14 }}>
        <Ionicons name="menu-outline" size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default MenuHeaderButton;
