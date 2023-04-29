import { Dimensions } from "react-native"

let widthWindow = Dimensions.get("window").width
let heightWindow = Dimensions.get("window").height

export const StyleVariables = {
    width: widthWindow,
    height: heightWindow
}
