import React from "react";
import {StyleSheet, TextInput, View} from "react-native";

{/*----------Importamos los colores----------*/}
import Colors from "../utils/colors.js";

{/*---------Exportamos el componente---------*/}
export default function(){
    return(
        <View style = {styles.viewForm}>
            <View style={styles.viewInputs}>
                <TextInput placeholder="Cantidad a pedir" keyboardType="numeric" style={styles.input}/>

                <TextInput placeholder="Interés %" keyboardType="numeric" style={[styles.input, styles.inputPercentage]}/>
            </View>
            
        </View>
    )

}

const styles = StyleSheet.create({
    viewForm:{
        position:"absolute",
        bottom: -60,
        width: "85%",
        paddingHorizontal: 50,
        backgroundColor: "#7DE7BD",
        borderRadius: 30,
        height: 180,
        justifyContent: "center",
    },

    viewInputs: {
        flexDirection: "row",
    },

    input: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        //borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 5,
        width: "60%",
        marginRight: 5,
        marginLeft: -5,
        marginBottom: 10,
        color: "#000",
        paddingHorizontal: 20,

    },
    inputPercentage: {
        width: "40%",
        marginLeft: 5,
    },

});