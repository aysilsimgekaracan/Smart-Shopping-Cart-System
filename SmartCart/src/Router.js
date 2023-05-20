import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  CartScreen,
  PaymentScreen,
  SignInScreen,
  SignUpScreen,
  ProfileScreen,
  CartDetailScreen,
  OrderConfirmationScreen,
} from "./screens";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "@Hooks/useFonts";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getAuth } from "firebase/auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="Cart"
    >
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen
        name="CartDetail"
        component={CartDetailScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

const HomeStack = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => null,
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          header: () => null,
          tabBarIcon: () => (
            <FontAwesome name="opencart" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => null,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function Router() {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    async function prepare() {
      try {
        if (auth.currentUser != null) {
          setUser(auth);
        } else {
          setUser(null);
        }

        useFonts();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName={user ? "HomeStack" : "SignIn"}
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ gestureEnabled: false }}
        />

        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
