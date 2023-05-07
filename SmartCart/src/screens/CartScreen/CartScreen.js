import { CartContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";

export function CartScreen() {
  const navigation = useNavigation();
  const goToPaymentScreen = () => {
    navigation.navigate("Payment");
  };

  return <CartContainer goToPaymentScreen={goToPaymentScreen} />;
}
