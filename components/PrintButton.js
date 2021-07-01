import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from "@react-navigation/native";

const PrintHeaderButton = () => {

    const navigation = useNavigation();
    const route = useRoute();

    return (
        <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => alert("Print")}
            >
            <View style={{ paddingRight: 14 }}>
                <AntDesign name="printer" size={30} />
            </View>
        </TouchableOpacity>
    )

}

export default PrintHeaderButton;