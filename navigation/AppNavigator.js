import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StartScreen from "../screens/StartScreen";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import StocksScreen from "../screens/StocksScreen";
import StockDetailsScreen from "../screens/StockDetailsScreen";
import NavigationMenu from "./NavigationMenu";
import HeaderButton from "../components/base/HeaderButton";
import { Routes } from "../constants/routes";
import ProfileScreen from "../screens/ProfileScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import EMA5Screen from "../screens/EMA5Sceen";
import CalculatorScreen from "../screens/CalculatorsScreen";

const RootStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();
const StockStack = createStackNavigator();

const AppNavigator = () => {
  const authToken = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => !!state.auth.token);
  const didAutoLogin = useSelector((state) => state.auth.didAutoLogin);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        mode="modal"
      >
        {isAuth && (
          <>
            <RootStack.Screen name="Main" component={MainNavigator} />
            <RootStack.Screen
              name="Menu"
              component={NavigationMenu}
              options={menuOptions}
            />
          </>
        )}
        {!isAuth && didAutoLogin && (
          <RootStack.Screen
            name="Auth"
            component={AuthScreen}
            option={{ headerShown: true }}
          />
        )}
        {!isAuth && !didAutoLogin && (
          <RootStack.Screen name="Start" component={StartScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const MainNavigator = ({ navigation }) => {
  return (
    <MainDrawer.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        gestureEnabled: false,
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => {
          const route = useRoute();
          return (
            <HeaderButton
              name="menu-outline"
              onPress={() => {
                navigation.navigate("Menu", { current: route.name });
              }}
              containerStyle={{ paddingLeft: 10 }}
            />
          );
        },
      }}
    >
      <MainDrawer.Screen name={Routes.HOME} component={HomeScreen} />
      <MainDrawer.Screen
        name={Routes.STOCKS}
        component={StockNavigator}
        options={{ headerShown: false }}
      />
      <MainDrawer.Screen name={Routes.PROFILE} component={ProfileScreen} />
      <MainDrawer.Screen name={Routes.PORTFOLIO} component={PortfolioScreen} />
      <MainDrawer.Screen name={Routes.EMA5} component={EMA5Screen} />
      <MainDrawer.Screen name={Routes.CALCULATOR} component={CalculatorScreen} />
    </MainDrawer.Navigator>
  );
};

const StockNavigator = ({ navigation }) => {
  return (
    <StockStack.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
      initialRouteName={Routes.STOCKS_SEARCH}
    >
      <StockStack.Screen name={Routes.STOCKS_SEARCH} component={StocksScreen} />
      <StockStack.Screen
        name={Routes.STOCK_DETAILS}
        component={StockDetailsScreen}
      />
    </StockStack.Navigator>
  );
};

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

export default AppNavigator;
