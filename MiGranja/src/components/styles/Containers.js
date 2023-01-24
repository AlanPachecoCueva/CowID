import { StyleSheet } from "react-native";
import colors from "../../utils/colors"

const containers = StyleSheet.create({
    cowScreenListElement: {
        flexDirection: 'row',
        paddingVertical: "3%",
        marginBottom: "5%",
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: 25,
    },

    cowScreenInfoContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: "10%"
    },

    cowInfoContent: {
        backgroundColor: "colors.QUATERNARY_COLOR",
        height: "100%",
        width: "100%",
        display: "flex"
    },

    cowInfoHeader: {
        color: "#fff",
        display: "flex",
        height: "35%",
        flexDirection: "row",
        width: "100%",
    },

    cowInfoBody: {
        backgroundColor: "#FFF6EF",
        height: "65%",
        

    },

    cowInfoFooter: {
        width: "90%",
        bottom: 80,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
    },

    cowInformationContainer: {
        width: "126%",
        marginLeft: -40,
        alignItems: "center",
        marginTop: "-10%",

    },

    cowDataInformation: {
        height: "22%",
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 25,
        fontFamily: "sans-serif-condensed",
        fontWeight: "600",
        color: "#441C00",
    },

    dataInformation1: {
        backgroundColor: "#FFF"
    },

    dataInformation2: {
        backgroundColor: "#F5DDCB",
    },

    productionContentContainer: {
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    inputContainer: {
        borderRadius: "20%",
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: colors.QUATERNARY_COLOR,
        borderRadius: 5,
        color: "#000",
        paddingHorizontal: 10,
        borderColor: colors.QUINARY_COLOR
    },

    

})
export { containers }