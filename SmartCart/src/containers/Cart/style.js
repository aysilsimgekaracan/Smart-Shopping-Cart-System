import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    textAlign: "center",
    fontFamily: "robotoMedium",
    paddingBottom: 50,
    fontSize: 24,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    backgroundColor: "white",
    width: "100%",
    alignContent: "flex-end",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  text: {
    fontSize: 42,
    fontFamily: "robotoBold",
  },
  responseView: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  cartView: {
    backgroundColor: "white",
    width: "50%",
    marginHorizontal: "25%",
    marginTop: 40,
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    verticalAlign: "middle",
    alignItems: "center",
  },
  cartText: {
    fontFamily: "robotoBold",
    fontSize: 36,
  },
  productsText: {
    fontFamily: "robotoRegular",
    fontSize: 36,
    margin: 7,
  },
  purchaseButton: {
    margin: 7,
    width: "40%",
    height: 40,
  },
});
