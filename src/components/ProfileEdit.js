import React from "react"
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from "react-native";

import colors from "../utils/colors";


{/* Pantalla para editar datos personales */ }
export default function ProfileEdit({ navigation }) {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#271d14'}}>

                <View >
                    <Text style={styles.formHeader}>Editar datos personales</Text>
                </View>
                <View style={styles.formContainer}>

                    {/* Username */}
                    <TextInput placeholder="Nombre De Usuario" keyboardType="ascii-capable" style={styles.inputText} />

                    {/* E-mail */}
                    <TextInput placeholder="Correo Electrónico" keyboardType="ascii-capable" style={styles.inputText} />



                    {/* <Button >Editar</Button> */}
                </View>
            </SafeAreaView>
        </>
    )
}

/**Los colores son : cafe oscuro: #271d14 para el fondo y blanco para los cuadros de texto */
/**pendiente mejorar el manejo de height y width */
const styles = StyleSheet.create({
    formContainer: {
        display: "flex",
        alignContent: "space-between",        
        height: "90%",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 30,
        backgroundColor: "#ffffff"
    },
    formHeader: {
        fontSize: 30,
        textAlign: "center",
        color:"#ffffff",
        marginBottom: 40,
        marginTop: 40

    },
    inputText: {
        fontSize: 25,
        marginTop: 30,
        
    },
  
});