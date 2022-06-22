import React, {Component, useState} from 'react';
import {Pressable, StyleSheet, TextInput, Text, View} from 'react-native';

{/*----------Importamos los colores----------*/}
import Colors from '../utils/colors.js';

{/*---------Exportamos el componente---------*/}
export default function(props){  
    
    function setUserLoggedIn(user){
        user = useState(true)

    }
    
    return(
        <View style = {styles.viewForm}>
            <Text style={[styles.slogan, styles.titulo]}>COWID</Text>
            <Text style={styles.slogan}>el lugar perfecto para dejar tu leche</Text>

            <View style={styles.viewInputs}>
                
                {/* Username */}
                <TextInput placeholder="Nombre De Usuario" keyboardType="numeric" style={styles.input}/>

                {/* E-mail */}
                <TextInput placeholder="Correo Electrónico" keyboardType="numeric" style={styles.input}/>

                {/* Password */}
                <TextInput placeholder="Contraseña" keyboardType="numeric" secureTextEntry style={styles.input}/>

                <Pressable style={[styles.input, styles.btnRegister]} onPress={() => props.setLoggedIn(true)}>
                    <Text style={styles.txtBtnRegister}>Registrar</Text>
                </Pressable>
                <View style={styles.viewIniciarSesion}>
                    <Text style={styles.txtIniciaSesion}>Ya tienes cuenta? </Text>
                    <Pressable style={[]} onPress={() => props.setLoggedIn(true)}>
                        <Text style={[styles.txtIniciaSesion, styles.iniciarPress]}>Inicia sesión</Text>
                    </Pressable>
                </View>
                
                {/* <Button style={[styles.input, styles.btnRegister]} onPress={() => props(true)} title="Registrar"/> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewForm:{
        position:"absolute",
        bottom: -320,
        width: "85%",
        paddingHorizontal: 50,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 30,
        height: 450,
        justifyContent: "center",
        alignItems:"center",
    },
    
    slogan:{
        textAlign:"center",
        bottom: "20%",
        fontFamily: "sans-serif-condensed",
        fontSize:20,
        color: "#fff",
        fontWeight: "bold",
        width: "133%",
    },

    titulo:{
          marginBottom:"3%", 
          marginTop:"40%",     
          fontSize:50,
    },

    viewInputs: {
        alignItems: "center",
        width:"100%",
        bottom:"10%",
        right: "-2%"
    },

    input: {
        borderRadius:"20%",
        width:"120%",
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        marginRight: 5,
        marginLeft: -5,
        marginBottom: 10,
        color: "#000",
        paddingHorizontal: 20,

    },
    btnRegister:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    txtBtnRegister:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    },
    txtIniciaSesion:{
        fontSize: 16,
        color:"#000"
    },
    viewIniciarSesion:{
        fontSize: 16,
        flexDirection: "row",

    },
    iniciarPress:{
        fontWeight: "bold",
    }
});