import { StyleSheet } from "react-native";
import colors from "../../utils/colors"


const buttons = StyleSheet.create({

    pressableCircle: {
        width: 30, alignSelf: "center",
        marginLeft: "5%",
        height: 30,
        backgroundColor: colors.QUATERNARY_COLOR,
        borderRadius: 50,
        opacity: 0.4
    },

    squareButtonContainer: {
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        alignSelf: "flex-end",
        backgroundColor: colors.QUATERNARY_COLOR,
        borderRadius: 18


    }
})

export { buttons }