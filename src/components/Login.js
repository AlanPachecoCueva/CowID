//import { StatusBar } from 'expo-status-bar';
import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
} from "react-native";

{
  /*-----------------Importación de colores-----------------*/
}
import colors from "./src/utils/colors";

{
  /*-----------------Importación de componentes-----------------*/
}
import Form from "./src/components/Form";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function App() {
  return (
    <>
      {/* Barra de notificaciones del telefono (Parte Superior) */}
      <StatusBar barStyle="light-content" />
      <View style={styles.ViewContainer}>
        <View style={styles.safeArea}>
          {/*Cabecera */}
          <Text style={styles.textoHead}>CowID</Text>
          <Image
            style={styles.img}
            source={require("./src/utils/images/cowLogo.png")}
          />

          <Form />
        </View>

        <View>{/* <Text>Resultado</Text> */}</View>

        <View>{/* <Text>Footer</Text> */}</View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ViewContainer:{
    height:"100%",
    //backgroundColor:"#FAEEDC"
  },
  safeArea: {
    backgroundColor: colors.TERTIARY_COLOR,
    height: "50%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  textoHead: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff", //blanco
    marginTop: 30,
  },
  img: {
    width: "50%",
    height: "50%",
    bottom: 0,
  },
});
