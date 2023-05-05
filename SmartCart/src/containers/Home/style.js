import { StyleSheet } from "react-native"
import { StyleVariables } from "@Styles/index"

export default StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        fontFamily: "robotoBold",
        paddingBottom: 20
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 80
    },
    productsText: {
        paddingTop: 20,
        fontFamily: "robotoMedium",
        textAlign: 'center',
        fontSize: 24,
        paddingBottom: 5
    },
    itemContainer: {
        width: StyleVariables.width * 0.9,
        height: 150,
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})