import React from "react"

/**Se importa material icons para el boton de editar perfil */
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import colors from "../utils/colors";

/*Constantes de prueba para borrar*/
const DATA = {
    user1: {
        name: "Nombre",
        lastname: "Apellido",
        mail: "example@mail.com",
        phone: "0987654321"
    },
    user2: {
        name: "David",
        mail: "example2@mail.com"
    }
}


export default function ProfileInfo({ navigation }) {

    return (

        <SafeAreaView style={{ backgroundColor: colors.QUATERNARY_COLOR }}>
            {/**Encabezado contiene titulo y boton */}
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.title}>Información de Usuario</Text>
                </View>
                <View style={styles.buttonContainer}>

                    <MaterialCommunityIcons.Button
                        name="account-edit"
                        backgroundColor={colors.PRIMARY_COLOR}
                        color={"#271d14"}
                        size={30}
                        borderRadius={30}
                        margin={5}
                        onPress={() => { navigation.navigate('ProfileEdit') }}
                    />
                </View>
            </View>
            {/**Informacion del usuario (pendiente a cambios) */}
            <View style={styles.infoContainer}>
                {/**Nombre */}
                <View style={styles.row}>
                    <Icon name="account"
                        size={35} />
                    <Text style={styles.textInfo}>Nombre: {DATA.user1.name} {DATA.user1.lastname}</Text>
                </View>
                {/**email */}
                <View style={styles.row}>
                    <Icon name="email"
                        size={35} />
                    <Text style={styles.textInfo}>Correo: {DATA.user1.mail}</Text>
                </View>
                {/**Numero de telefono*/}
                <View style={styles.row}>
                    <Icon name="phone"
                        size={35} />
                    <Text style={styles.textInfo}>Teléfono: {DATA.user1.phone}</Text>
                </View>
            </View>
        </SafeAreaView>

    )
}
/**Los colores son : cafe oscuro: #271d14 para el fondo y blanco para los cuadros de texto */
/**pendiente mejorar el manejo de height y width */
const styles = StyleSheet.create({

    
    infoContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: "10%"
    },


    headerContainer: {
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        maxWidth: "90%",
        height:"20%"
    },

    buttonContainer:{
        marginTop:"10%"
    },

    row: {
        flexDirection: "row",
        padding: "4%",
    },

    textInfo: {
        fontSize: 20,
        display: "flex",
        marginLeft: 20
    },

    title: {
        fontSize: 30,
        margin: 20,
        color: "#ffffff"
    },

});

