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
//import { styles, buttons, containers, titles } from "./styles/Styles.js"
import {titles} from "./styles/Titles";
import {containers} from "./styles/Containers"
import {buttons} from "./styles/Buttons"
/**Se importan las pantallas para agregar los litros diarios y los chequeos medicos */
import Production from "./Production.js";
import Vet from "./Vet.js";


//diferencia el nombre de la vaca de los botones
//tratamiento en la informacion de la vaca
export default function CowInfo({ navigation, route }) {

    /*******************************************Variables y funciones*************************************************  */
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
        })
    };
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
        //loadCow();
        // loadProducciones();
        //getProduccion();
        // loadEnfermedades();
        // loadVacunas();

    }, []);
    /*******************************************Terminan Variables y funciones*************************************************  */
    return (
        <SafeAreaView style={containers.cowInfoContent}>
            {/* Contenedor de la image */}
            <Image style={{ position: "absolute", width: "100%", height: 280 }} source={require("../utils/images/VacaSacandoLengua.jpg")}></Image>
            <View style={containers.cowInfoHeader}>
                {/* Boton para regresar a la pantalla de informacion de la vaca */}
                <View style={{ width: 64, margin: "5%" }}>
                    <MaterialCommunityIcons.Button
                        margin={4}
                        name="arrow-left"
                        backgroundColor={"#b47f59"}
                        color={"#fff"}
                        size={35}
                        borderRadius={50}
                        onPress={() => { changeScreen(0) }}
                    ></MaterialCommunityIcons.Button>

                </View>
                <Text style={titles.cowInfoTitle}> ID: 1</Text>
            </View>
            <View style={containers.cowInfoBody}>
                {/* La funcion screen contiene el switch que evalua la pagina a mostrar (litros diarios, chequeo medico , informacion) */}
                {screen()}
            </View>
            {/* Botones con posicion abssoluta para ingresar leche o ingresar ficha medica */}
            <View style={containers.cowInfoFooter}>
                <View style={{ width: "47%" }}>
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
                    ><Text style={{ fontSize: 20, color: "#fff", fontFamily: "sans-serif-condensed" }}>Produccion</Text>
                    </MaterialCommunityIcons.Button>
                </View>
                <View style={{ width: "47%" }}>
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
                    ><Text style={{ fontSize: 20, color: "#fff", fontFamily: "sans-serif-condensed" }}>Veterianaria</Text>
                    </MaterialCommunityIcons.Button>
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
                if (cow.aptaParaProduccion == 1) {
                    aP = "Sí";
                }
                return (
                    <View style={containers.cowInformationContainer}>
                        <Text style={[containers.cowDataInformation, containers.dataInformation1]}>Peso: {cow.Peso} kg</Text>
                        <Text style={[containers.cowDataInformation, containers.dataInformation2]}>Cantidad de partos: {cow.NumeroPartos}</Text>
                        <Text style={[containers.cowDataInformation, containers.dataInformation1]}>Produciendo: {aP}</Text>
                        <Text style={[containers.cowDataInformation, containers.dataInformation2]}>Ubicación: {cow.ParcelaUbicacion}</Text>
                    </View>

                )
            /**Formulario para agregar leche */
            case 1:
                return (
                    <Production produccionHoy={produccion} />
                    // <Text>Te la creiste we</Text>
                )
            case 2:
                /**Formulario para ficha medica */
                return (
                    <Vet setScreen={changeScreen} />
                )
        }

    }
}


