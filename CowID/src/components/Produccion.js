import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";


//dos inputs para la manana y la tarde
//una vez ingresado el input se bloquea la opcion
//boton para editar
//anadir la metrica de litros junto al input mas pequeno
export default function Produccion() {

    const [editables, setEditable] = useState(true);

    const handleEditable = () => {
        setEditable(!editables);
    }


    return (
        <View style={styles.content}>
            <View>

                <Text style={styles.textStyle}>Ingrese la cantidad de leche en litros</Text>



            </View>
            <Text style={[styles.textStyle, {marginTop:30}]}>Leche recogida en la mañana</Text>
            <View style={styles.inputContainer}>
                <View>
                    <TextInput editable={editables} placeholder="Litros" keyboardType="decimal-pad" b style={[styles.input, styles.textStyle]} />
                </View>
                <View>
                    <Text style={[styles.textStyle, { marginLeft: 12, marginRight: 12 }]}>Ltr</Text>
                </View>
                {/* Este boton guarda los litros diarios recolectados */}
                <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons.Button
                        name="content-save"
                        backgroundColor="#c88d63"
                        color={"#271d14"}
                        size={30}
                        borderRadius={30}
                        onPress={() => { handleEditable() }}
                    >{/** <Text style={{ fontSize: 18 }}>Guardar</Text>*/}
                    </MaterialCommunityIcons.Button>
                </View>
                {/* Este boton guarda los litros diarios recolectados */}
                <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons.Button
                        name="pencil"
                        backgroundColor="#c88d63"
                        color={"#271d14"}
                        size={30}
                        borderRadius={30}
                        onPress={() => { handleEditable() }}
                    >{/** <Text style={{ fontSize: 18 }}>Guardar</Text>*/}
                    </MaterialCommunityIcons.Button>
                </View>
            </View>

            <Text style={[styles.textStyle, {marginTop:30}]}>Leche recogida en la tarde</Text>
            <View style={styles.inputContainer}>
                <View>
                    <TextInput editable={editables} placeholder="Litros" keyboardType="decimal-pad" b style={[styles.input, styles.textStyle]} />
                </View>
                <View>
                    <Text style={[styles.textStyle, { marginLeft: 12, marginRight: 12 }]}>Ltr</Text>
                </View>
                {/* Este boton guarda los litros diarios recolectados */}
                <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons.Button
                        name="content-save"
                        backgroundColor="#c88d63"
                        color={"#271d14"}
                        size={30}
                        borderRadius={30}
                        onPress={() => { handleEditable() }}
                    >{/** <Text style={{ fontSize: 18 }}>Guardar</Text>*/}
                    </MaterialCommunityIcons.Button>
                </View>
                {/* Este boton guarda los litros diarios recolectados */}
                <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons.Button
                        name="pencil"
                        backgroundColor="#c88d63"
                        color={"#271d14"}
                        size={30}
                        borderRadius={30}
                        onPress={() => { handleEditable() }}
                    >{/** <Text style={{ fontSize: 18 }}>Guardar</Text>*/}
                    </MaterialCommunityIcons.Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    content: {
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    textStyle: {
        fontFamily: "sans-serif-condensed",
        fontSize: 25
    },
    input: {
        borderRadius: "20%",
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: colors.QUATERNARY_COLOR,
        borderRadius: 5,
        color: "#000",
        paddingHorizontal: 10,

    },

    buttonContainer: {
        justifyContent: "center",
        width: "19%",
        paddingLeft: "2%",
        paddingRight: "2%",
    },

    inputContainer: {

        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    }

})