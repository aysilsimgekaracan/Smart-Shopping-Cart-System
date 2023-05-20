import React, { useState } from "react";
import { PaymentContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";

export function PaymentScreen(props) {
  const navigation = useNavigation();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  var totalAmount = [];

  if (props.route.params && props.route.params.totalAmount) {
    totalAmount = props.route.params.totalAmount;
  } else {
    totalAmount = [];
  }

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const isValidExpiryDate = (value) => {
    const [month, year] = value.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    return (
      isNumeric(month) &&
      isNumeric(year) &&
      parseInt(month) >= 1 &&
      parseInt(month) <= 12 &&
      parseInt(year) >= currentYear &&
      !(parseInt(year) === currentYear && parseInt(month) < currentMonth)
    );
  };

  const formatExpiryDate = (value) => {
    let formattedValue = value.replace(/\//g, ""); // Remove existing slashes
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }
    return formattedValue;
  };

  const handleChangeExpiryDate = (value) => {
    const formattedValue = formatExpiryDate(value);
    setExpiryDate(formattedValue);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <PaymentContainer
      goBack={goBack}
      totalAmount={totalAmount}
      cardNumber={cardNumber}
      setCardNumber={setCardNumber}
      expiryDate={expiryDate}
      setExpiryDate={setExpiryDate}
      cvv={cvv}
      setCvv={setCvv}
      isNumeric={isNumeric}
      isValidExpiryDate={isValidExpiryDate}
      handleChangeExpiryDate={handleChangeExpiryDate}
    />
  );
}
