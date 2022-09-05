import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";
import { updateProduccion } from "../apiRoutes/apiProduccion.js";

//import { titles, containers, buttons } from "./styles/Styles.js"
import { titles } from "./styles/Titles";
import { containers } from "./styles/Containers"
import { buttons } from "./styles/Buttons"
import { styles } from "./styles/Styles";
//dos inputs para la manana y la tarde
//una vez ingresado el input se bloquea la opcion
//boton para editar
//anadir la metrica de litros junto al input mas pequeno
export default function Production(props) {

    const [productionTime, setProductionTime] = useState(true);
    const handleProductionTime = (value) => {
        setProductionTime(value);

    }

    const [editableManana, setEditableManana] = useState(true);
    const [editableTarde, setEditableTarde] = useState(true);

    const handleEditableManana = () => {
        setEditableManana(!editableManana);
    }

    const handleEditableTarde = () => {
        setEditableTarde(!editableTarde);
    }


    const [manana, setManana] = useState(props.produccionHoy.CantidadManana);
    const [tarde, setTarde] = useState(props.produccionHoy.CantidadTarde);

    console.log("Se imprime: " + props.produccionHoy.CantidadManana);


    let produccionActual = props.produccionHoy;
    const actualizaProduccion = async () => {
        console.log("******************");
        produccionActual.CantidadManana = manana;
        produccionActual.CantidadTarde = tarde;
        console.log(produccionActual);
        () => setProduccion({
            CantidadManana: manana,
            CantidadTarde: tarde,
            Fecha: props.Fecha,
            VacaID: props.VacaID
        })
        let id = produccionActual.id;
        console.log(id);
        console.log(produccionActual);
        await updateProduccion(id, produccionActual);

    }

    return (
        <View style={containers.productionContentContainer}>
            <View style={{ width: "100%", flexDirection: "row" }}>
                <View style={{ width: "50%", alignSelf: "flex-start" }}>

                    <Feather.Button
                        name="sunrise"
                        backgroundColor={productionTime ? "#271d14" : "#c88d63"}
                        color={productionTime ? "#c88d63" : "#271d14"}
                        size={40}
                        width={"50%"}
                        borderRadius={0}
                        paddingLeft={"10%"}
                        onPress={() => handleProductionTime(true)}

                    ><Text style={{ fontSize: 20, fontFamily: "sans-serif-condensed", fontWeight: "600", color: productionTime ? "#c88d63" : "#271d14" }}>Mañana</Text>
                    </Feather.Button>
                </View>
                <View style={{ width: "50%", alignSelf: "flex-end" }}>

                    <Feather.Button
                        name="sunset"
                        backgroundColor={productionTime ? "#c88d63" : "#271d14"}
                        color={productionTime ? "#271d14" : "#c88d63"}
                        size={40}
                        width={"50%"}
                        borderRadius={0}
                        paddingLeft={"10%"}
                        onPress={() => handleProductionTime(false)}
                    ><Text style={{ color: "#c88d63", fontSize: 20, fontFamily: "sans-serif-condensed", fontWeight: "600", color: productionTime ? "#271d14" : "#c88d63" }}>Tarde</Text>
                    </Feather.Button>
                </View>
            </View>

            <View style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "-10%" }}>
                <TextInput editable={editableManana} placeholder={produccionActual.CantidadManana.toString()} keyboardType="decimal-pad" b style={[containers.inputContainer, styles.textStyle, { width: 200, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0, color: editableManana ? "#000" : "#707070" }]} onChangeText={(value) => setManana(value)} />
                <Text style={[styles.textStyle, containers.inputContainer, { borderLeftWidth: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRightWidth: 0, textAlignVertical: "center", color: "#707070" }]}>Ltr</Text>
                <MaterialCommunityIcons.Button
                    name="pencil"
                    backgroundColor="#c88d63"
                    color={"#271d14"}
                    size={30}
                    margin={2}
                    borderLeftWidth={0}
                    onPress={() => { handleEditableManana(); }}
                >
                </MaterialCommunityIcons.Button>
            </View>
            
            <Pressable style={[buttons.squareButtonContainer, { alignSelf: "center", display: "flex", flexDirection: "row", marginBottom: "20%" }]} onPress={() => { handleEditableManana() }}>
                <Text style={{ color: colors.SECONDARY_COLOR, fontSize: 25 }}>Guardar</Text>
                <Icon name="plus" color={colors.SECONDARY_COLOR} size={25} />
            </Pressable>

            {productionType()}

        </View>
    )

    function productionType() {
        {/* Implementar funcion para guardar la produccion de la manana o la tarde    */ }

    }

}

