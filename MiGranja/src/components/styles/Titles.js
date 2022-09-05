import { StyleSheet } from "react-native";
import colors from "../../utils/colors"

const titles = StyleSheet.create({
    
    cowScreenTitle: {
        fontSize: 30,
        margin: 20,
        color: "#ffffff",
    },

    cowInfoTitle: {
        height: "20%",
        width: "30%",
        marginTop: "5%",
        marginLeft: "12%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 27,
        fontFamily: "sans-serif-condensed",
        fontWeight: "700",
        color: "#FFF",
        backgroundColor: "#000",
        borderRadius: 15
    }
})

export { titles }