import React, { useState, useEffect } from "react";
import { OrdersContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { db } from "@Configs/firebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export function OrdersScreen(props) {
  const navigation = useNavigation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  var userId = "";

  if (props.route.params && props.route.params.userId) {
    userId = props.route.params.userId;
  } else {
    userId = "";
  }

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "orders"),
            where("userId", "==", userId),
            orderBy("createdDate", "desc")
          )
        );

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const goToOrdersDetailScreen = (orderId) => {
    navigation.navigate("OrderDetails", { orderId: orderId });
  };

  return (
    <OrdersContainer
      goBack={goBack}
      orders={orders}
      loading={loading}
      goToOrdersDetailScreen={goToOrdersDetailScreen}
    />
  );
}
