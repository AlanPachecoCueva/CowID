
import React, { useEffect, useState } from "react"

import { NavigationContainer, useRoute, route } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, FlatList, Touchable, TouchableOpacity } from "react-native";
import colors from "../utils/colors";

import { getAuth } from 'firebase/auth';
import { firebase } from '../utils/firebase';

import AddCow from "./AddCow";
import CowInfo from "./CowInfo";
// import CowScreen from "./CowScreen";

/**En esta pagina se listan todas las vacas, ademas se puede agregar nuevas vacas */

const VacasStack = createNativeStackNavigator();

const DATA = [
    {
        id: 12345,
        nombre: "pepa",
        peso: 30.12,
        fechaNacimiento: "junio",
        edad: 12,
        cantidadPartos: 2,
        produciendo: true,
        ubicacion: "Parcela 1"

    },

    {
        id: 12346,
        nombre: "lola",
        peso: 30,
        fechaNacimiento: "abril",
        edad: 10,
        cantidadPartos: 4,
        produciendo: false,
        ubicacion: "Parcela 2"

    }
]

const CowScreen = ({ navigation, route }) => {

    /**Funcion que detecta si se agrega una vaca o no mediante los params de AgregarVaca.js */
    console.log(DATA)

    return (
        <SafeAreaView style={{ backgroundColor: colors.QUATERNARY_COLOR, alignItems: "center" }}>
            {/* <Image style = {styles.userImg} source={{uri:profilePic}}/> */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Vacas de mi granja</Text>
            </View>
            <View style={styles.infoContainer}>
                <FlatList
                    data={DATA}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.cowElement}>
                                {/* Checkbox para seleccionar las vacas que se van a borrar */}
                                <View style={{ width: "15%", alignContent: "flex-start", padding: "2%" }}>
                                    <TouchableOpacity style={styles.circle}></TouchableOpacity>
                                </View>
                                {/* Nombre de la vaca */}
                                <View style={{ width: "45%", flexWrap: "wrap" }}>
                                    <Text style={{ fontSize: 30 }}>{item.nombre}</Text>
                                </View>
                                {/* Edad de la vaca */}
                                <View style={{ width: "25%" }}>
                                    <Text style={{ fontSize: 30 }}>{item.edad}</Text>
                                </View>
                                {/* Boton para editar la informacion de la vaca */}
                                <View style={{ width: "15%" }}>
                                    <Pressable style={[styles.buttonContainer, { marginRight: "15%" }]} onPress={() => { navigation.navigate("CowInfo", item) }}>
                                        <Icon name="pencil" color={colors.SECONDARY_COLOR} size={25} />
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }
                    }
                />
                {/* Boton para agregar una vaca a la lista, envia la lista como params */}
                <View style={{ marginBottom: "60%" }}>
                    <Pressable style={styles.buttonContainer} onPress={() => { navigation.navigate('AddCow',{data:DATA}) }}>
                        <Icon name="plus" color={colors.SECONDARY_COLOR} size={25} />
                    </Pressable>
                </View>
            </View>

        </SafeAreaView>

    )

}

export default CowScreen;

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
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "90%",
        height: "15%"
    },

    buttonContainer: {
        flexDirection: "row",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: colors.QUATERNARY_COLOR,
        borderRadius: 15,
        marginTop: "10%"
    },



    buttonSalir: {
        flexDirection: "row",
        margin: "5%",
        paddingHorizontal: "10%",
        paddingVertical: "3%",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: colors.QUATERNARY_COLOR,
        borderRadius: 15
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
    textButton: {
        fontSize: 20,
        display: "flex",
        paddingRight: 4,
        color: colors.SECONDARY_COLOR
    },

    title: {
        fontSize: 30,
        margin: 20,
        color: "#ffffff",

    },

    userImg: {
        borderRadius: 125,
        height: 200,
        width: 200,
        marginTop: 20,
    },

    cowElement: {
        flexDirection: 'row',
        paddingVertical: "3%",
        marginBottom: "10%",
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: 25
    },

    circle: {
        width: 30,
        height: 30,
        backgroundColor: colors.QUATERNARY_COLOR,
        opacity: 0.4,
        borderRadius: 30,

    }
});
