import React, { useState, useEffect } from "react";
import { OrderDetailsContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";

export function OrderDetailsScreen(props) {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  return <OrderDetailsContainer goBack={goBack} />;
}
