import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from "@react-navigation/native";

const MenuHeaderButton = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate("Menu", {current: route.name});
      }}
    >
      <View style={{ paddingLeft: 14 }}>
        <Ionicons name="menu-outline" size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default MenuHeaderButton;
