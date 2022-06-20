import React from "react"

/**Se importa material icons para el boton de editar perfil */
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";

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

        <SafeAreaView style={{ backgroundColor: '#271d14' }}>
            {/**Encabezado contiene titulo y boton */}
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.title}>Información de Usuario</Text>
                </View>
                <View style={{ marginTop: 30 }}>

                    <MaterialCommunityIcons.Button
                        name="account-edit"
                        backgroundColor="#c88d63"
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
                    <Text style={styles.textInfo}>telefono: {DATA.user1.phone}</Text>
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
        height: "80%",
        backgroundColor: "#ffffff",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingTop: 40
    },

    headerContainer: {

        flexDirection: "row",
        justifyContent: "center",
    },

    row: {
        flexDirection: "row",
        padding: 20,
    },

    textInfo: {
        fontSize: 25,
        display: "flex",
        marginLeft: 20
    },

    title: {
        fontSize: 40,
        margin: 20,
        color: "#ffffff"
    }
});

