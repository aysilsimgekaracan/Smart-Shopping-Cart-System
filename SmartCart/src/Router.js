import React, { useEffect, useState, useCallback } from "react"
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, CartScreen, PaymentScreen, SignInScreen, SignUpScreen } from "./screens"
import * as SplashScreen from 'expo-splash-screen'
import useFonts from "@Hooks/useFonts"
import { AntDesign, FontAwesome } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// function PaymentStack() {
//     return (
//     <Stack.Navigator
//         screenOptions={{ header: () => null }}
//         initialRouteName="Cart">
//         <Stack.Screen name="Cart" component={CartScreen} />
//         <Stack.Screen name="Payment" component={PaymentScreen} />

//     </Stack.Navigator>
//     )

// }

const HomeStack = () => {
  return (<Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} options={{
      header: () => null, tabBarIcon: () => (
        <AntDesign name="home" size={24} color="black" />
      )
    }} />
    <Tab.Screen name="Cart" component={CartScreen} options={{
      header: () => null, tabBarIcon: () => (
        <FontAwesome name="opencart" size={24} color="black" />
      )
    }} />

  </Tab.Navigator>)

}

function Router() {
  const [user, setUser] = useState(null)
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        useFonts()
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName={user ? "HomeStack" : "HomeStack"}
        screenOptions={{
          header: () => null
        }}>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ gestureEnabled: false }} />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ gestureEnabled: false }} />

        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ gestureEnabled: false }} />

        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Router