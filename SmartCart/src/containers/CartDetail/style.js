import { StyleSheet } from "react-native";
import { StyleVariables } from "@Styles/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  headerText: {
    fontFamily: "robotoBold",
    paddingBottom: 20,
  },
  emptyCartText: {
    fontFamily: "robotoRegular",
    fontSize: 18,
    marginBottom: 16,
    color: "blue",
  },
  contentContainer: {
    flex: 1,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  countText: {
    fontFamily: "robotoRegular",
    fontSize: 24,
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
