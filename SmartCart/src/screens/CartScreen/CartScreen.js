import { CartContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { MobileModel, Module, torch } from "react-native-pytorch-core";

export function CartScreen() {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);
  const [model, setModel] = useState(null);

  url =
    "https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/blob/mobile-ios/best.torchscript.ptl";

  useEffect(() => {
    setIsReady(false);
    async function loadModel() {
      console.log("Downloading model from", url);
      const filePath = await MobileModel.download(url);
      console.log("Model downloaded to", filePath);
      const model = await torch.jit._loadForMobile(filePath);
      console.log("Model loaded for lite interpreter");
      setModel(model);
      setIsReady(true);
    }
    loadModel();
  }, [setIsReady, setModel, url]);

  const goToPaymentScreen = () => {
    navigation.navigate("Payment");
  };

  return (
    <CartContainer
      goToPaymentScreen={goToPaymentScreen}
      isReady={isReady}
      model={model}
    />
  );
}
