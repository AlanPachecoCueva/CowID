import React from "react"
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from "react-native";

/**Se importa material icons para el boton de editar perfil */
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../utils/colors";


{/* Pantalla para editar datos personales */ }
export default function ProfileEdit({ navigation }) {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: colors.QUATERNARY_COLOR }}>

                <View >
                    <Text style={styles.formHeader}>Editar datos personales</Text>
                </View>
                <View style={styles.formContainer}>

                    {/* Username */}
                    <View style={styles.inputContainer}>
                        <Text>Nombre de usuario</Text>
                        <TextInput placeholder="Nombre De Usuario" keyboardType="ascii-capable" style={styles.inputText} />
                    </View>


                    {/* E-mail */}
                    <View style={styles.inputContainer}>
                        <Text>Correo Electrónico</Text>
                        <TextInput placeholder="Correo Electrónico" keyboardType="ascii-capable" style={styles.inputText} />
                    </View>

                    {/* Boton para guardar cambios */}
                    <View style={styles.buttonContainer}>
                        <MaterialCommunityIcons.Button
                            name="content-save"
                            backgroundColor={colors.PRIMARY_COLOR}
                            color={colors.QUATERNARY_COLOR}
                            size={30}
                            borderRadius={30}
                            margin={5}

                            onPress={() => { }}
                        ><Text style={{ fontSize: 18 }}>Guardar cambios</Text>
                        </MaterialCommunityIcons.Button>

                    </View>

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
        height: "100%",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: "10%",
        backgroundColor: "#ffffff"
    },
    formHeader: {
        fontSize: 30,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 40,
        marginTop: 40

    },
    inputText: {
        fontSize: 20,
        marginTop: "5%",

    },
    inputContainer: {
        marginTop: "7%",
        fontSize: 20,


    },
    buttonContainer: {
        marginTop: "50%",
        width: "100%",
        paddingLeft: "18%",
        paddingRight: "18%",
    }

});