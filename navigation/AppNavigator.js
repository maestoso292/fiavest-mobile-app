import React from "react";
import { useSelector } from "react-redux";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import StocksScreen from "../screens/StocksScreen";
import StockDetailsScreen from "../screens/StockDetailsScreen";
import NavigationMenu from "./NavigationMenu";
import MenuHeaderButton from "./MenuHeaderButton";
import { Routes } from "../constants/routes";

const MainDrawer = createDrawerNavigator();
const StockStack = createStackNavigator();

const StockNavigator = () => {
  return (
    <StockStack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
      initialRouteName={Routes.STOCKS_SEARCH}
    >
      <StockStack.Screen
        name={Routes.STOCKS_SEARCH}
        component={StocksScreen}
        options={{
          headerLeft: () => {
            return <MenuHeaderButton />;
          },
        }}
      />
      <StockStack.Screen
        name={Routes.STOCK_DETAILS}
        component={StockDetailsScreen}
      />
    </StockStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainDrawer.Navigator
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
      <MainDrawer.Screen name={Routes.HOME} component={HomeScreen} />
      <MainDrawer.Screen
        name={Routes.STOCKS}
        component={StockNavigator}
        options={{ headerShown: false }}
      />
    </MainDrawer.Navigator>
  );
};

const RootStack = createStackNavigator();

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
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        mode="modal"
      >
        {authToken == null ? (
          <RootStack.Screen
            name="Auth"
            component={AuthScreen}
            option={{ headerShown: true }}
          />
        ) : (
          <>
            <RootStack.Screen name="Main" component={MainNavigator} />
            <RootStack.Screen
              name="Menu"
              component={NavigationMenu}
              options={menuOptions}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
