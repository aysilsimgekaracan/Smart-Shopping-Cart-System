import React, { useState, useEffect } from "react";
import { PaymentContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { db } from "@Configs/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function PaymentScreen(props) {
  const navigation = useNavigation();
  const auth = getAuth();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser != null) {
      setUser(auth);
    } else {
      setUser(null);
    }
  }, []);

  var totalAmount = [];

  if (props.route.params && props.route.params.totalAmount) {
    totalAmount = props.route.params.totalAmount;
  } else {
    totalAmount = [];
  }

  var itemsInCart = [];

  if (props.route.params && props.route.params.itemsInCart) {
    itemsInCart = props.route.params.itemsInCart;
  } else {
    itemsInCart = [];
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

  const goToOrderConfirmationScreen = () => {
    navigation.navigate("OrderConfirmation");
  };

  const handlePayment = async () => {
    setLoading(true);
    if (user != null) {
      const userId = user.currentUser.uid;
      try {
        const ordersCollection = collection(db, "orders");

        addDoc(ordersCollection, {
          createdDate: serverTimestamp(),
          userId: userId,
          totalAmount: totalAmount,
        })
          .then((orderDocRef) => {
            const orderDetailsCollection = collection(db, "orderDetails");
            const orderId = orderDocRef.id;
            for (let key in itemsInCart) {
              console.log(itemsInCart);
              addDoc(orderDetailsCollection, {
                orderId: orderId,
                product_id: key,
                quantity: itemsInCart[key],
              });
            }

            // Navigate where you want
            setLoading(false);
            goToOrderConfirmationScreen();
          })
          .catch((error) => {
            console.error("Error adding order:", error);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    setLoading(false);
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
      handlePayment={handlePayment}
      loading={loading}
    />
  );
}
