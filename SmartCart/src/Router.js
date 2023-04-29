import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen, CartScreen, PaymentScreen, SignInScreen, SignUpScreen} from "./screens"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
    <Tab.Screen name="Home" component={HomeScreen} options={{ header: () => null }}/>
    <Tab.Screen name="Cart" component={CartScreen} options={{ header: () => null }}/>

    </Tab.Navigator>)
    
}

function Router() {
    return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn"
        screenOptions={{
          header: () => null,
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