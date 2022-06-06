//import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, SafeAreaView, View, StatusBar } from "react-native";

{/*-----------------Importación de colores-----------------*/}
import colors from "./src/utils/colors";

{/*-----------------Importación de componentes-----------------*/}
import Form from "./src/components/Form";

export default function App() {
  return (
    <>
    {/* Barra de notificaciones del telefono (Parte Superior) */}
      <StatusBar barStyle="light-content" />

      <View style={styles.safeArea}>
        {/*Cabecera */}
        <Text style={styles.textoHead}>CowID</Text>

        <Form/>
      </View>

      <View>
        <Text>Resultado</Text>
      </View>

      <View>
        <Text>Footer</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.PRIMARY_COLOR_DARK,
    height:"50%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  textoHead: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff", //blanco
    marginTop: 15,
  },
});
