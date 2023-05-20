import React, { useState, useEffect } from "react";
import { CartDetailContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { db } from "@Configs/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export function CartDetailScreen(props) {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  var itemsInCart = [];

  if (props.route.params && props.route.params.itemsInCart) {
    itemsInCart = props.route.params.itemsInCart;
  } else {
    itemsInCart = [];
  }

  useEffect(() => {
    async function getProducts() {
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);
      const productsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          count: itemsInCart.hasOwnProperty(doc.id) ? itemsInCart[doc.id] : 0,
          ...doc.data(),
        }))
        .filter((product) => product.count > 0);

      setProducts(productsData);

      const totalAmount = productsData.reduce(
        (total, product) => total + product.price * product.count,
        0
      );

      setTotalAmount(totalAmount);
    }

    getProducts();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const goToPaymentScreen = () => {
    navigation.navigate("Payment", { totalAmount: totalAmount });
  };

  return (
    <CartDetailContainer
      goBack={goBack}
      goToPaymentScreen={goToPaymentScreen}
      products={products}
      itemsInCart={itemsInCart}
      totalAmount={totalAmount}
    />
  );
}
