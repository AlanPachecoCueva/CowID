import { TabRouter, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react"
import { ScrollView, feAreaView, StyleSheet, Text, View, TextInput, Image, Pressable, Switch } from "react-native";

/**Se importa material icons para el boton de editar perfil */
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
/**Imports para manejo de la imagen */

//import {getStorage,ref, uploadBytes} from 'firebase/storage';
import colors from "../utils/colors";

{/* Pantalla para gaurdar los datos de la vaca */ }
export default function AddCow({ navigation, route }) {

    console.log(parseInt(route.params.length))

    const [newId, setNewId] = useState(() => route.params.length)
    const [name, setName] = useState('')
    const [weight, setWeight] = useState(0)
    const [birth, setBirth] = useState(0)
    const [calving, setCalving] = useState(0)
    const [produce, setProduce] = useState(false)
    const [ubication, setUbication] = useState("Parcela 1")

    const [isEnabled, setIsEnabled] = useState(false);

    function resetCow() {
        setNewId(() => route.params.length);
        setName('');
        setWeight(0);
        setBirth('');
        setCalving(0)
        setProduce(false);
        setUbication('')
    }
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        isEnabled ? setProduce(true) : setProduce(false)
        // if(isEnabled){
        //     setProduce(true)
        // } else {
        //     setProduce(false)
        // }
    }

    let vaca = {
        id: newId,
        nombre: name,
        peso: weight,
        fechaNacimiento: birth,
        edad: birth,
        cantidadPartos: calving,
        produciendo: produce,
        ubicacion: ubication
    }


    // if(route.params !== undefined){
    //     console.warn(route.params.data.length);   
    //     console.warn(newId)

    // }

    return (
        <>
            <ScrollView style={{ backgroundColor: "#ffffff" }}>
                {/* <View style={styles.formHeader}>
                    <Text style={styles.title}>Completa la información</Text>
                </View> */}
                {/* <View style={styles.imageContainer}>

                    <View style={styles.button}>
                        <MaterialCommunityIcons.Button
                            name="camera-image"
                            backgroundColor={colors.QUATERNARY_COLOR}
                            color={colors.SECONDARY_COLOR}
                            size={25}
                            borderRadius={30}

                        >
                        </MaterialCommunityIcons.Button>
                    </View>
                </View> */}

                <View style={styles.formContainer}>
                    {/* Nombre de la vaca */}
                    <View style={styles.inputContainer}>
                        <Text>Nombre de la vaca</Text>

                        <TextInput placeholder="Nombre de la vaca" keyboardType="ascii-capable" style={styles.inputText} onChangeText={(val) => setName(val)} />
                    </View>

                    {/* Nacimiento*/}
                    <View style={styles.inputContainer}>
                        <Text>Fecha de nacimiento</Text>
                        <TextInput placeholder="Fecha de nacimiento" keyboardType="decimal-pad" style={styles.inputText} onChangeText={(val) => setBirth(val)} />
                    </View>

                    {/*  Peso */}
                    <View style={styles.inputContainer}>
                        <Text>Peso</Text>
                        <TextInput placeholder="Peso" keyboardType="number-pad" style={styles.inputText} onChangeText={(val) => setWeight(val)} />
                    </View>

                    {/* partos */}
                    <View style={styles.inputContainer}>
                        <Text>Cantidad de partos</Text>
                        <TextInput placeholder="Cantidad de partos" keyboardType="decimal-pad" style={styles.inputText} onChangeText={(val) => setCalving(val)} />
                    </View>

                    {/* produccion */}
                    <View style={styles.inputContainer}>
                        <Text>¿Está produciendo?</Text>
                        <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}></Switch>
                    </View>

                    {/* ubicación */}
                    <View style={styles.inputContainer}>
                        <Text>Ubicación</Text>
                        <TextInput placeholder="Parcelas" keyboardType="ascii-capable" style={styles.inputText} onChangeText={(val) => setUbication(val)} />
                    </View>


                    {/* Boton para agregar la vaca */}
                    <View style={styles.buttonContainer}>
                        <MaterialCommunityIcons.Button
                            name="plus"
                            backgroundColor={colors.PRIMARY_COLOR}
                            color={colors.QUATERNARY_COLOR}
                            size={30}
                            borderRadius={30}
                            margin={5}
                            onPress={() => { navigation.goBack(); route.params.push(vaca); }}
                        ><Text style={{ fontSize: 18 }}>Agregar</Text>
                        </MaterialCommunityIcons.Button>
                    </View>

                </View>
            </ScrollView>
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
        width: "100%",
        fontSize: 30,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 40,
        marginTop: 40,
        alignItems: "center"
    },

    title: {
        fontSize: 40,
        fontWeight: "bold"
    },

    inputText: {
        fontSize: 20,
        marginTop: "5%",

    },
    userImg: {
        borderRadius: 125,
        height: 200,
        width: 200,
        marginTop: 20,
    },
    inputContainer: {
        marginTop: "7%",
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: "10%",
        paddingHorizontal: "10%",
        paddingVertical: "1%",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: 25
    },

    imageContainer: {
        flexDirection: "row",
        alignSelf: "center",
    },
    button: {
        flexDirection: "row",
        paddingVertical: "1%",
        paddingLeft: '2.5%',
        alignSelf: "center",
        backgroundColor: colors.QUATERNARY_COLOR,
        borderRadius: 25
    }

});