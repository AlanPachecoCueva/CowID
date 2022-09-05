
import React, { useEffect, useState } from "react"

import { NavigationContainer, useRoute, route } from '@react-navigation/native';


import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable, FlatList, Touchable, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
//import { styles, titles, containers, buttons } from "./styles/Styles.js"
import {titles} from "./styles/Titles";
import {containers} from "./styles/Containers"
import {buttons} from "./styles/Buttons"
import { getVacas, getVaca } from '../apiRoutes/apiVaca';
import { getAuth, signOut } from 'firebase/auth';
import { firebase } from '../utils/firebase';
import { useIsFocused } from '@react-navigation/native';

// import CowScreen from "./CowScreen";

/**En esta pagina se listan todas las vacas, ademas se puede agregar nuevas vacas */

let DATA = [
    {
        id: 12345,
        nombre: "pepa",
        peso: 30.12,
        fechaNacimiento: "junio",
        edad: 12,
        cantidadPartos: 2,
        produciendo: false,
        ubicacion: "Parcela 1"
    },
    {
        id: 12346,
        nombre: "lola",
        peso: 30,
        fechaNacimiento: "abril",
        edad: 10,
        cantidadPartos: 4,
        produciendo: true,
        ubicacion: "Parcela 2"
    }
]

const CowScreen = ({ navigation, route }) => {
    const [upList, setUpList] = useState(false);
    const [cowList, setCowList] = useState([{
        peso: 51.0,
        fechaNacimiento: '2022/07/16',
        numeroPartos: 3,
        qr: '',
        parcelaUbicacion: '',
        edadDestete: 7,
        aptaParaProduccion: 0,
        id: 1
    },
    {
        peso: 51.0,
        fechaNacimiento: '2022/07/16',
        numeroPartos: 3,
        qr: '',
        parcelaUbicacion: '',
        edadDestete: 7,
        aptaParaProduccion: 1,
        id: 2
    }
    ]

    );
    const [cowId, setCowId] = useState(8);
    const [cow, setCow] = useState();

    const loadCows = async () => {

        let cowL = await getVacas();
        setCowList(cowL[0]);

    }

    const loadCow = async () => {
        let cowI = await getVaca(cowId);
        () => setCow(cowI);
    }

    useEffect(() => {

        //loadCows();

       // const refresh = navigation.addListener('focus', () => {
         //   loadCows();
       // });
       // return refresh;
    }, [navigation]);

    console.log(cowList);
    console.log("************************************")

    { /*console.warn(DATA)*/ }
    return (
        <SafeAreaView style={{ backgroundColor: colors.QUATERNARY_COLOR, alignItems: "center" }}>
            <Text style={[{ marginTop: "10%", marginBottom: "10%" }, titles.cowScreenTitle]}>Vacas de mi granja</Text>
            <View style={containers.cowScreenInfoContainer}>
                <FlatList
                    data={cowList}
                    keyExtractor={item => item.id}
                    extraData={upList}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={containers.cowScreenListElement}>
                                {/* Checkbox para seleccionar las vacas que se van a borrar */}
                                <TouchableOpacity style={buttons.pressableCircle}></TouchableOpacity>
                                <Text style={{ fontSize: 20, marginLeft: "5%", width:"60%" }}>id: {item.id}{'\n'}
                                    Ubicación: {item.ParcelaUbicacion}</Text>
                                <Pressable style={[buttons.squareButtonContainer]} onPress={() => { navigation.navigate("CowInfo", item.id) }}>
                                    <Icon name="pencil" color={colors.SECONDARY_COLOR} size={25} />
                                </Pressable>
                            </View>
                        )
                    }
                    }
                />
                {/* Boton para agregar una vaca a la lista, envia la lista como params */}
                <Pressable style={[{bottom:"30%"}, buttons.squareButtonContainer]} onPress={() => { navigation.navigate('AddCow', DATA) }}>
                    <Icon name="plus" color={colors.SECONDARY_COLOR} size={25} />
                </Pressable>
            </View>
        </SafeAreaView>

    )

}

export default CowScreen;

