import React, { useState } from "react";
import { OrderConfirmationContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

export function OrderConfirmationScreen(props) {
  const navigation = useNavigation();

  const navigateToHomeScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }], // Replace 'Root' with the name of your root screen
      })
    );
  };

  return (
    <OrderConfirmationContainer navigateToHomeScreen={navigateToHomeScreen} />
  );
}
