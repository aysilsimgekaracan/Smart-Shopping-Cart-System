import React, { useState, useEffect } from "react";
import { OrderDetailsContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { db } from "@Configs/firebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export function OrderDetailsScreen(props) {
  const navigation = useNavigation();

  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  var orderId = "";

  if (props.route.params && props.route.params.orderId) {
    orderId = props.route.params.orderId;
  } else {
    orderId = "";
  }

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setLoading(true);
    const fetchOrderDetails = async () => {
      try {
        // Retrieve order details for the specific order ID
        const orderDetailsSnapshot = await getDocs(
          query(collection(db, "orderDetails"), where("orderId", "==", orderId))
        );
        const orderDetails = orderDetailsSnapshot.docs.map((doc) => doc.data());
        // Retrieve the corresponding products for the order details
        const productIds = orderDetails.map((detail) => detail.product_id);
        const productsSnapshot = await getDocs(
          query(collection(db, "products"))
        );
        const products = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Combine the order details with the product information
        const orderDetailsWithProducts = orderDetails.map((detail) => {
          const product = products.find((p) => p.id === detail.product_id);
          return { ...detail, product };
        });

        setOrderDetails(orderDetailsWithProducts);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();

    setLoading(false);
  }, []);

  return (
    <OrderDetailsContainer
      goBack={goBack}
      loading={loading}
      orderDetails={orderDetails}
      orderId={orderId}
    />
  );
}
