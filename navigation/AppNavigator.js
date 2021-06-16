import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import StocksScreen from "../screens/StocksScreen";
import NavigationMenu from "./NavigationMenu";
import MenuHeaderButton from "./MenuHeaderButton";

export const ROUTE_NAMES = {
  AUTH: "Auth",
  HOME: "Home",
  STOCKS: "Stocks",
  STOCKS_SEARCH: "Stock Search",
  STOCK_DETAILS: "Stock Details",
  PORTFOLIO: "Portfolio",
  EMA5: "EMA5",
  CALCULATOR: "Calculator",
  NEWS: "News",
  HISTORY: "History",
  PROFILE: "Profile",
};

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        gestureEnabled: false,
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => {
          return <MenuHeaderButton />;
        },
      }}
    >
      <Drawer.Screen name={ROUTE_NAMES.HOME} component={HomeScreen} />
      <Drawer.Screen name={ROUTE_NAMES.STOCKS} component={StocksScreen} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

const menuOptions = {
  cardStyle: { backgroundColor: "transparent" },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.7],
        extrapolate: "clamp",
      }),
    },
  }),
};

// TODO Merge with Victor's navigator for auth
const AppNavigator = () => {
  const authToken = useSelector((state) => state.auth.token);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        mode="modal"
      >
        {authToken == null ? (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            option={{ headerShown: true }}
          />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen
              name="Menu"
              component={NavigationMenu}
              options={menuOptions}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
