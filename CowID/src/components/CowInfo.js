import react from "react";
import React, { useState } from 'react';
import Colors from '../utils/colors.js';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Button, FlatList, TextInput, ImageBackground, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from 'react-native-date-picker'


/**Se importan las pantallas para agregar los litros diarios y los chequeos medicos */
import Produccion from "./Produccion.js";
import Veterinaria from "./Veterinaria.js";


/**Constante temporal para borrar incluye los datos de la vaca escaneada */
const DATA = {
    vaca: {
        id: 12348,
        nombre: "lala",
        peso: 22,
        fechaNacimiento: "enero",
        edad: 2,
        cantidadPartos: 1,
        produciendo: true,
        ubicacion: "Parcela 2"

    }
}

//diferencia el nombre de la vaca de los botones
//tratamiento en la informacion de la vaca
export default function CowInfo({ navigation, route }) {

    function dateSelect() {
        const [date, setDate] = useState(new Date())
        return <DatePicker date={date} onDateChange={setDate} />
    }

    const [cowScreen, setCowScreen] = useState(0);

    function changeScreen(screenID) {
        setCowScreen(screenID);
    }

    if (route.params !== undefined) {
        DATA.vaca = route.params
    }

    return (
        <SafeAreaView>
            <View style={styles.content}>
                {/* Contenedor de la image */}
                <View >
                    <Image style={{ position: "absolute", width: "100%", height: 270 }} source={require("../utils/images/lolaImg.png")}></Image>
                </View>
                <View style={styles.header}>
                    {/* Boton para regresar a la pantalla de informacion de la vaca */}
                    <View style={{ width: 50, margin: "5%" }}>
                        <MaterialCommunityIcons.Button
                            name="arrow-left"
                            backgroundColor={"#b47f59"}
                            color={"#271d14"}
                            size={35}
                            borderRadius={50}
                            onPress={() => { changeScreen(0) }}
                        ></MaterialCommunityIcons.Button>
                    </View>

                    {/*       Aqui va el nombre e identificador de la vaca       */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{DATA.vaca.nombre} {DATA.vaca.id}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    {/* La funcion screen contiene el switch que evalua la pagina a mostrar (litros diarios, chequeo medico , informacion) */}
                    <View>
                        {screen()}
                    </View>
                </View>
                {/* Botones con posicion abssoluta para ingresar leche o ingresar ficha medica */}
                <View style={styles.buttonsContainer}>
                    <View style={{ width: "45%" }}>

                        {/* Ingresar litros diarios */}
                        <MaterialCommunityIcons.Button
                            name="plus-circle-outline"
                            backgroundColor={"#b47f59"}
                            color={"#fff"}
                            size={30}
                            borderRadius={35}
                            margin={5}
                            height={90}
                            onPress={() => { changeScreen(1) }}
                        ><Text style={{ fontSize: 30, color: "#fff", fontFamily: "sans-serif-condensed" }}>Añadir Litros</Text>
                        </MaterialCommunityIcons.Button>
                    </View>

                    <View style={{ width: "45%" }}>

                        {/* Ingresar ficha medica */}
                        <MaterialCommunityIcons.Button
                            name="plus-circle-outline"
                            backgroundColor={"#8c6345"}
                            color={"#fff"}
                            size={30}
                            borderRadius={35}
                            margin={5}

                            height={90}
                            onPress={() => { changeScreen(2) }}
                        ><Text style={{ fontSize: 30, color: "#fff", fontFamily: "sans-serif-condensed" }}>Ficha médica</Text>
                        </MaterialCommunityIcons.Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )

    /**Esta funcion permite mostrar los formularios de: agregar leche, ficha vacuna, embarazo, enfermedad, informacion */
    function screen() {
        switch (cowScreen) {

            /**Editar aqui la informacion de la vaca  */
            case 0:
                return (
                    <FlatList
                        data={[
                            { key: 'Peso: ' + DATA.vaca.peso + ' kg' },
                            { key: 'Edad: ' + DATA.vaca.edad + ' años' },
                            { key: 'Cantidad de partos: ' + DATA.vaca.cantidadPartos },
                            { key: 'Produciendo: ' + (DATA.vaca.cantidadPartos ? "Si" : "No") },
                            { key: 'Ubicación: ' + DATA.vaca.ubicacion },

                        ]}
                        renderItem={({ item }) => <Text style={{
                            fontSize: 25, marginTop: "2%", fontFamily: "sans-serif-condensed"
                        }}>{item.key}</Text>}
                    />
                )

            /**Formulario para agregar leche */
            case 1:
                return (
                    <Produccion />
                )
            case 2:
                /**Formulario para ficha medica */
                return (
                    <Veterinaria setScreen={changeScreen} />
                )
            case 3:
                /**Formulario de gestación para agregar fechas de inseminacion */
                return (
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontFamily: "sans-serif-condensed", fontSize: 20 }}>Fecha de inseminación</Text>
                            <TextInput placeholder="Inseminación" keyboardType="ascii-capable" style={[styles.input]} />
                           
                        </View>
                    </View>
                )
            case 4:
                /**Formulario de enfermedad */
                return (
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontFamily: "sans-serif-condensed", fontSize: 20 }}>Nombre de la Enfermedad</Text>
                            <TextInput placeholder="Nombre" keyboardType="ascii-capable" style={[styles.input]} />
                        </View>



                        <View style={styles.inputContainer}>
                            <Text style={{ fontFamily: "sans-serif-condensed", fontSize: 20 }}>Descripción</Text>
                            <TextInput placeholder="Descripcion" keyboardType="ascii-capable" style={[styles.input]} />
                        </View>
                    </View>
                )
            case 5:
                /**Formulario de vacuna */
                return (
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontFamily: "sans-serif-condensed", fontSize: 20 }}>Nombre de la vacuna</Text>
                            <TextInput placeholder="Vacuna" keyboardType="ascii-capable" style={[styles.input]} />
                        </View>
                    </View>
                )

        }

    }
}

const styles = StyleSheet.create({

    content: {
        backgroundColor: Colors.QUATERNARY_COLOR,
        height: "100%",
        width: "100%",
        display: "flex"
    },

    header: {
        color: "#fff",
        height: "35%",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },

    body: {
        backgroundColor: "#fff",
        height: "65%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: "10%",
        paddingTop: "20%"

    },

    title: {
        margin: "5%",
        fontSize: 25,
        color: "#fff",
        fontFamily: "sans-serif-condensed"

    },

    titleContainer: {
        backgroundColor: Colors.QUATERNARY_COLOR,
        borderRadius: 5,
        margin: "5%",
        height: "20%",
        paddingLeft: "4%"

    },

    buttonsContainer: {
        position: "absolute",
        width: "80%",
        bottom: 410,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "8%",
        justifyContent: "space-between",



    },

    button: {
        backgroundColor: Colors.PRIMARY_COLOR,
        color: "#271d14",
        size: 22,
        borderRadius: 20,
        margin: 5,
        minWidth: 110,
        height: 80
    },


    inputText: {
        fontSize: 20,
        marginTop: "5%",


    },

    inputContainer: {
        marginTop: "4%",

    },

    input: {
        fontFamily: "sans-serif-condensed",
        fontSize: 20,
        height: 50,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: Colors.QUATERNARY_COLOR,
        marginTop: 5,

    }

})
