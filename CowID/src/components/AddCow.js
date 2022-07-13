import React, { useState, useEffect } from "react"
import { ScrollView, feAreaView, StyleSheet, 
    Text, View, TextInput, Button,
    Image, Pressable, Switch } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
/**Se importa material icons para el boton de editar perfil */
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
/**Imports para manejo de la imagen */

//import {getStorage,ref, uploadBytes} from 'firebase/storage';
import colors from "../utils/colors";

import DateTimePickerModal from "react-native-modal-datetime-picker";

{/* Pantalla para gaurdar los datos de la vaca */ }
export default function AddCow({ navigation, route }) {

    console.log(parseInt(route.params.length))

    const [newId, setNewId] = useState(() => route.params.length)
    const [name, setName] = useState('')
    const [weight, setWeight] = useState(0)
    const [birth, setBirth] = useState('2022/07/10')
    const [calving, setCalving] = useState(0)
    const [produce, setProduce] = useState(false)
    const [ubication, setUbication] = useState("Parcela 1")

    const [isEnabled, setIsEnabled] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const formatDate = (fech) =>{
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let str = fech.toLocaleDateString("en-US",options);
        return fech.getFullYear()+'/'+str.substring(0,5);
    }

    const handleConfirm = (date) => {
        setBirth(formatDate(date));
        hideDatePicker();
    };


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

    return (
        <>
            <ScrollView style={{ backgroundColor: "#ffffff" }}>
                <View style={styles.formContainer}>
                
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    date={new Date(birth)}
                    onCancel={hideDatePicker}
                />

                    {/* Nombre de la vaca */}
                    <View style={styles.inputContainer}>
                        <Text>Nombre de la vaca</Text>
                        <TextInput placeholder="Nombre de la vaca"  keyboardType="ascii-capable" style={styles.inputText} onChangeText={(val) => setName(val)} />
                    </View>

                    {/* Nacimiento*/}
                    <View style={styles.inputContainer}>
                        <Text>Fecha de nacimiento</Text>
                        <View style={styles.inputHorizontalContainer}>
                            <TextInput placeholder="Seleccione una fecha" editable={true} keyboardType='number-pad'
                            value={birth}
                            style={styles.inputText}/>
                            <Pressable style={styles.buttonSalir} backgroundColor={colors.QUINARY_COLOR} onPress={showDatePicker}> 
                                <Icon name="calendar" color={colors.SECONDARY_COLOR} size={25}/>
                            </Pressable>
                        </View>
                    </View>

                    {/*  Peso */}
                    <View style={styles.inputContainer}>
                        <Text>Peso</Text>
                        <TextInput placeholder="Peso"  keyboardType="number-pad" style={styles.inputText} onChangeText={(val) => setWeight(val)} />
                    </View>

                    {/* partos */}
                    <View style={styles.inputContainer}>
                        <Text>Cantidad de partos</Text>
                        <TextInput placeholder="Cantidad de partos" keyboardType="decimal-pad" style={styles.inputText} onChangeText={(val) => setCalving(val)} />
                    </View>

                    {/* produccion */}
                    <View style={styles.inputHorizontalContainer}>
                        <Text style={{paddingRight:20}}>¿Está produciendo?</Text>
                        <Switch trackColor={{ false: "#767577", true: "#c7934e" }}
                            thumbColor={isEnabled ? "#271d14" : "#271d14"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}></Switch>
                    </View>

                    {/* ubicación */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel} >Ubicación</Text>
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
        paddingHorizontal:20,
        alignContent:"center"
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

    inputLabel:{
        marginTop:"0%"
    },

    inputText: {
        fontSize: 20,
        paddingVertical:7,
        paddingHorizontal:15,
        borderRadius:10,
        marginTop: "3%",
        marginBottom:"0%",
        borderWidth:1,
        borderColor:colors.QUINARY_COLOR
    },
    userImg: {
        borderRadius: 125,
        height: 200,
        width: 200,
        marginTop: 20,
    },
    inputContainer: {
        marginTop: "5%",
        fontSize: 20,
    },
    inputHorizontalContainer: {
        marginTop: "2%",
        flexDirection:"row",
        fontSize: 20,
        alignItems: "center",
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
    buttonSalir:{
        flexDirection: "row",
        marginLeft:"5%",
        paddingHorizontal:"3%",
        paddingVertical:"3%",
        backgroundColor:colors.QUATERNARY_COLOR,
        borderRadius: 10
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