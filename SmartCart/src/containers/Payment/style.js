import { StyleSheet } from "react-native";
import { StyleVariables } from "@Styles/index";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontFamily: "robotoBold",
    paddingBottom: 20,
  },
  button: {
    marginTop: 16,
    color: "white",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  totalText: {
    fontFamily: "robotoRegular",
    fontSize: 18,
  },
  totalAmountText: {
    fontFamily: "robotoMedium",
    fontSize: 24,
    fontWeight: "bold",
  },
});
