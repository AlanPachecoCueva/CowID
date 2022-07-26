import react from "react";
import React, { useState, useEffect } from 'react';

import colors from "../utils/colors";
import { Pressable, SafeAreaView, StyleSheet, Text, View, Button, FlatList, TextInput, ImageBackground, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from 'react-native-date-picker'

import { getVacas, getVaca } from '../apiRoutes/apiVaca';
import { getProducciones, getProduccion, saveProduccion, updateProduccion, deleteVaca } from "../apiRoutes/apiProduccion.js";
import { getEnfermedad, getEnfermedades, saveVaca, updateEnfermedad, getLastEnfermedades } from "../apiRoutes/apiEnfermedad.js";
import { getVacuna, deleteVacuna, updateVacuna, getVacunas, saveVacuna } from "../apiRoutes/apiVacuna";

/**Se importan las pantallas para agregar los litros diarios y los chequeos medicos */
import Produccion from "./Produccion.js";
import Veterinaria from "./Veterinaria.js";


//diferencia el nombre de la vaca de los botones
//tratamiento en la informacion de la vaca
export default function CowInfo({ navigation, route }) {



    const formatDate = (fech) => {
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let str = fech.toLocaleDateString("en-US", options);
        return fech.getFullYear() + '/' + str.substring(0, 5);
    }

    /**Constante y funcion para administrar los componentes produccion y veterianaria */
    const [cowScreen, setCowScreen] = useState(0);

    function changeScreen(screenID) {
        setCowScreen(screenID);
    }

    /**Constante que guarda la vaca actual */
    const [cow, setCow] = useState({
        peso: 51.0,
        fechaNacimiento: '2022/07/16',
        numeroPartos: 3,
        qr: '',
        parcelaUbicacion: '',
        edadDestete: 7,
        aptaParaProduccion: 0,
        id: 1
    });

    const [producciones, setProducciones] = useState([{
        CantidadManana: 0,
        CantidadTarde: 0,
        Fecha: '2022/07/14',
        VacaID: 50,
        id: 55
    },
    {
        CantidadManana: 0,
        CantidadTarde: 0,
        Fecha: '2022/07/14',
        VacaID: 51,
        id: 56
    }]);

    /**se guarda la produccion de la vaca actual */
    const [produccion, setProduccion] = useState({
        CantidadManana: 0,
        CantidadTarde: 0,
        Fecha: '2022/07/14',
        VacaID: 550,
        id: 551
    });


    const [cowId, setCowId] = useState(route.params);
    const [vacuna, setVacuna] = useState();
    const [descVacuna, setDescVacuna] = useState();
    const [enfermedad, setEnfermedad] = useState();
    const [descripcion, setDescripcion] = useState();
    const [enfermedades, setEnfermedades] = useState([{
        Descripcion: "",
        FechaCuracion: "",
        FechaDeteccion: "",
        Nombre: "",
        VacaID: 0,
        id: 0
    },
    {
        Descripcion: "",
        FechaCuracion: "",
        FechaDeteccion: "",
        Nombre: "",
        VacaID: 1,
        id: 1
    }]);

    const [vacunas, setVacunas] = useState([{
        Descripcion: "",
        FechaCuracion: "",
        FechaDeteccion: "",
        Nombre: "",
        VacaID: 0,
        id: 0
    },
    {
        Descripcion: "",
        FechaCuracion: "",
        FechaDeteccion: "",
        Nombre: "",
        VacaID: 1,
        id: 1
    }]);


    /**Se obtiene la vaca actual de la api */
    const loadCow = async () => {
        const cowI = await getVaca(cowId);
        setCow(cowI);
    }

    /**Se guardan todas las producciones en la constante producciones */
    const loadProducciones = async () => {
        const produccionesTmp = await getProducciones();
        setProducciones(produccionesTmp[0]);
        //console.log(typeof (producciones));
    }

    const getProduccion = () => {
        producciones.forEach((element, index) => {
            if (element.VacaID === cowId) {
                console.log(element.id);
                console.log("index: " + index)
                setProduccion(element);
            }
        })};
        /**Se itera en el arreglo de producciones buscando el de la vaca actual */
        // const getProduccion = () => {
        //     // const prodAct = producciones.find(data => data.VacaID === cowId);
        //     // setProduccion(prodAct);
        //     producciones.forEach((element) => {
        //         if (element.VacaID == cowId) {
        //             setProduccion(element);
        //             console.log(element);
        //         }
        //     })
        // };


        /**Si una vaca no tiene producciones crear una */
        const nuevaProduccion = async () => {
            if (produccion.Fecha === undefined || produccion.Fecha) {
                const newProd = {
                    CantidadManana: 15,
                    CantidadTarde: 15,
                    Fecha: '2022/07/15',
                    VacaID: cowId,
                }
                await saveProduccion(newProd);
                //console.log("nuevas: " + producciones);
            }
        }



        const nuevaEnfermedad = async () => {
            const newEnfermedad = {
                Descripcion: descripcion,
                //FechaCuracion: '2022/07/15',
                FechaDeteccion: formatDate(new Date()),
                Nombre: enfermedad,
                VacaID: cowId,
            }
            console.log(newEnfermedad);
            await saveVaca(newEnfermedad);
            loadEnfermedades();
            setCowScreen(6);
        }

        const nuevaVacuna = async () => {
            const newVacuna = {
                VacaID: cowId,
                //FechaCuracion: '2022/07/15',
                Fecha: formatDate(new Date()),
                NombreVacuna: vacuna,
                Descripcion: descVacuna,
            }
            console.log(newVacuna);
            await saveVacuna(newVacuna);
            loadVacunas();
            setCowScreen(6);
        }


        const loadEnfermedades = async () => {
            const enfermedadesTmp = await getEnfermedades();
            setEnfermedades(enfermedadesTmp[0]);
            //console.log(enfermedades);
        }

        const loadVacunas = async () => {
            const vacunasTmp = await getVacunas();
            setVacunas(vacunasTmp[0]);
            console.log(vacunasTmp);
            //console.log(vacunas);
        }

        const loadEnfermedad = async () => {
            const enfermedadTmp = await getEnfermedad(cowId);
            setEnfermedad(enfermedadTmp);
            // console.log(enfermedad);
        }

        console.log("*************************************")

        let date3 = formatDate(new Date());
        console.log(date3);
        // console.log(produccion);

        useEffect(() => {
            loadCow();
            // loadProducciones();
            //getProduccion();
            // loadEnfermedades();
            // loadVacunas();

        }, []);

        return (
            <SafeAreaView>
                <View style={styles.content}>
                    {/* Contenedor de la image */}
                    <View >
                        <Image style={{ position: "absolute", width: "100%", height: 270 }} source={require("../utils/images/VacaSacandoLengua.jpg")}></Image>
                    </View>
                    <View style={styles.header}>
                        {/* Boton para regresar a la pantalla de informacion de la vaca */}
                        <View style={{ width: 50, margin: "5%" }}>
                            <MaterialCommunityIcons.Button
                                name="arrow-left"
                                backgroundColor={"#b47f59"}
                                color={"#fff"}
                                size={35}
                                borderRadius={50}
                                onPress={() => { changeScreen(0) }}
                            ></MaterialCommunityIcons.Button>
                        </View>

                        {/*       Aqui va el nombre e identificador de la vaca       */}
                        {/* <View style={styles.titleContainer}>
                            {/* <Text style={styles.title}>{DATA.vaca.nombre} {DATA.vaca.id}</Text> *
                            <Text style={styles.title}>Vaca id:{cow.id}</Text>
                        </View> */}
                    </View>
                    <View style={styles.body}>
                        {/* La funcion screen contiene el switch que evalua la pagina a mostrar (litros diarios, chequeo medico , informacion) */}

                        {screen()}

                    </View>
                    {/* Botones con posicion abssoluta para ingresar leche o ingresar ficha medica */}
                    <View style={styles.buttonsContainer}>
                        <View style={{ width: "45%" }}>

                            {/* Ingresar litros diarios */}
                            <MaterialCommunityIcons.Button
                                name="plus-circle-outline"
                                backgroundColor={"#b47f59"}
                                color={"#fff"}
                                size={25}
                                borderRadius={35}
                                margin={5}
                                height={50}
                                onPress={() => { changeScreen(1); getProduccion() }}
                            ><Text style={{ fontSize: 25, color: "#fff", fontFamily: "sans-serif-condensed" }}>Litros</Text>
                            </MaterialCommunityIcons.Button>
                        </View>

                        <View style={{ width: "45%" }}>

                            {/* Ingresar ficha medica */}
                            <MaterialCommunityIcons.Button
                                name="plus-circle-outline"
                                backgroundColor={"#b47f59"}
                                color={"#fff"}
                                size={30}
                                borderRadius={35}
                                margin={5}

                                height={50}
                                onPress={() => { changeScreen(2); loadEnfermedades(); loadVacunas() }}
                            ><Text style={{ fontSize: 25, color: "#fff", fontFamily: "sans-serif-condensed" }}>Ficha médica</Text>
                            </MaterialCommunityIcons.Button>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                            {/* <Text style={styles.title}>{DATA.vaca.nombre} {DATA.vaca.id}</Text> */}
                            <Text style={styles.title}>ID:{cow.id}</Text>
                    </View> 
                </View>
            </SafeAreaView>
        )

        /**Esta funcion permite mostrar los formularios de: agregar leche, ficha vacuna, embarazo, enfermedad, informacion */
        function screen() {
            switch (cowScreen) {

                /**Editar aqui la informacion de la vaca  */
                case 0:
                    var aP = "No";
                    if(cow.aptaParaProduccion == 1){
                        aP = "Sí";
                    }
                    return (
                        <View style={styles.dataInformationContainer}>
                            <View style={styles.dataInformation1}>
                                <Text style={styles.textDataInformation}>Peso: {cow.Peso} kg</Text> 
                            </View>

                            <View style={styles.dataInformation2}>
                                <Text style={styles.textDataInformation}>Cantidad de partos: {cow.NumeroPartos}</Text>
                            </View>

                            <View style={styles.dataInformation1}>
                                <Text style={styles.textDataInformation}>Produciendo: {aP}</Text>
                            </View>

                            <View style={styles.dataInformation2}>
                                <Text style={styles.textDataInformation}>Ubicación: {cow.ParcelaUbicacion}</Text>
                            </View>
                        </View>
                        
                    )
                /* data={[ <FlatList
                renderItem={({ item }) => <Text style={{
                                fontSize: 25, marginTop: "2%", fontFamily: "sans-serif-condensed"
                            }}>{item.key}</Text>}
                        />*/
                /**Formulario para agregar leche */
                case 1:
                    return (
                        <Produccion produccionHoy={produccion} />
                        // <Text>Te la creiste we</Text>
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
                                <TextInput placeholder="Nombre" keyboardType="ascii-capable" style={[styles.input]} onChangeText={(value) => { setEnfermedad(value) }} />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={{ fontFamily: "sans-serif-condensed", fontSize: 20 }}>Descripción</Text>
                                <TextInput placeholder="Descripcion" keyboardType="ascii-capable" style={[styles.input]} onChangeText={(value) => { setDescripcion(value) }} />
                            </View>

                            {/* Boton para agregar la vaca */}
                            <Pressable style={styles.buttonContainer} backgroundColor={colors.PRIMARY_COLOR} onPress={() => { nuevaEnfermedad() }} >
                                <Icon name="plus-box" style={{ paddingRight: 10 }} color={colors.SECONDARY_COLOR} size={25} />
                                <Text style={{ fontSize: 18, color: colors.SECONDARY_COLOR, fontWeight: "bold" }}>Agregar</Text>
                            </Pressable>
                        </View>
                    )
                case 5:
                    /**Formulario de vacuna */
                    return (
                        <View>
                            <View style={styles.inputContainer}>
                                <Text style={{ fontFamily: "sans-serif-condensed", fontSize: 20 }}>Nombre de la vacuna</Text>
                                <TextInput placeholder="Vacuna" keyboardType="ascii-capable" style={[styles.input]} onChangeText={(value) => { setVacuna(value) }} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={{ fontFamily: "sans-serif-condensed", fontSize: 20 }}>Descripcion</Text>
                                <TextInput placeholder="Vacuna" keyboardType="ascii-capable" style={[styles.input]} onChangeText={(value) => { setDescVacuna(value) }} />
                            </View>
                            <Pressable style={styles.buttonContainer} onPress={() => { nuevaVacuna() }}>
                                <Icon name="plus" color={colors.SECONDARY_COLOR} size={25} />
                            </Pressable>
                        </View>
                    )

                case 6:
                    /**Lista de enfermedades */
                    return (
                        <View style={{ paddingBottom: "20%" }}>
                            <FlatList
                                data={enfermedades}
                                keyExtractor={item => item.id}
                                extraData={enfermedades}
                                renderItem={({ item }) => {

                                    if (item.VacaID === cowId) {
                                        return (
                                            <View style={styles.cowElement}>
                                                <Text style={{ fontSize: 18 }}>Nombre: {item.Nombre}</Text>
                                                <Text style={{ fontSize: 18 }}>Descripcion: {item.Descripcion}</Text>
                                                <Text style={{ fontSize: 18 }}>Fecha de detección: {item.FechaDeteccion}</Text>
                                                <Text style={{ fontSize: 18 }}>Fecha de curación: {item.FechaCuracion}</Text>
                                            </View>
                                        )
                                    }

                                }
                                }
                            />

                            <Pressable style={styles.buttonAddContainer} >
                                <Icon name="plus" color={colors.SECONDARY_COLOR} size={25} onPress={() => setCowScreen(4)} />
                            </Pressable>


                        </View>
                    )

                case 7:
                    /**Lista de vacunas */
                    return (
                        <View style={{ paddingBottom: "40%" }}>
                            <FlatList
                                data={vacunas}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    if (item.VacaID === cowId) {

                                        return (
                                            <View style={styles.cowElement}>
                                                <Text style={{ fontSize: 18 }}>Nombre vacuna: {item.Nombre}</Text>
                                                <Text style={{ fontSize: 18 }}>Descripcion: {item.Descripcion}</Text>
                                                <Text style={{ fontSize: 18 }}>Fecha: {item.FechaDeteccion}</Text>
                                            </View>
                                        )
                                    }

                                }
                                }
                            />
                            <Pressable style={styles.buttonAddContainer} >
                                <Icon name="plus" color={colors.SECONDARY_COLOR} size={25} onPress={() => setCowScreen(5)} />
                            </Pressable>
                        </View>
                    )

            }

        }
    }

    const styles = StyleSheet.create({
        dataInformationContainer:{
            width:"126%",
            marginLeft:-40,
            alignItems:"center",
            marginTop:"-10%"
        },
        dataInformation2:{
            alignItems:"center",
            width:"100%",
            backgroundColor:"#F5DDCB",
            
        },
        dataInformation1:{
        },
        textDataInformation:{
            fontSize: 25, 
            fontFamily: "sans-serif-condensed",
            fontWeight:"600",
            color:"#441C00",
            marginTop: "5%",  
            marginBottom: "5%", 
        },
        content: {
            backgroundColor: "colors.QUATERNARY_COLOR",
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
            justifyContent: "space-between",
            
        },

        body: {
            backgroundColor: "#FFF6EF",
            height: "65%",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: "10%",
            paddingTop: "20%"

        },

        title: {
            fontSize: 20,
            color: "#fff",
            fontFamily: "sans-serif-condensed",
            fontWeight:"bold"
        },

        titleContainer: {
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: "#000",
            borderRadius:10,
            height: "6%",
            marginHorizontal:155,
            marginTop:"-160%"
        },

        buttonsContainer: {
            position: "absolute",
            width: "80%",
            bottom: 410,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "9%",
            justifyContent: "space-between",
            marginTop:"-140%"
        },

        button: {
            backgroundColor: colors.PRIMARY_COLOR,
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
            borderBottomColor: colors.QUATERNARY_COLOR,
            marginTop: 5,

        },

        buttonContainer: {
            flexDirection: "row",
            marginTop: "10%",
            paddingHorizontal: "10%",
            paddingVertical: "3%",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: colors.PRIMARY_COLOR,
            borderRadius: 15
        },
        cowElement: {

            padding: "4%",
            marginBottom: "5%",
            // backgroundColor: colors.PRIMARY_COLOR,
            borderRadius: 25,
            borderStyle: "solid",
            borderColor: colors.PRIMARY_COLOR,
            borderWidth: 2
        },

        buttonAddContainer: {
            flexDirection: "row",
            paddingHorizontal: "3%",
            paddingVertical: "3%",
            alignItems: "center",
            alignSelf: "flex-end",
            backgroundColor: colors.QUATERNARY_COLOR,
            borderRadius: 15,
            marginTop: "10%"
        },


    })
