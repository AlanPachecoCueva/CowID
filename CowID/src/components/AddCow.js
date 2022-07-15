import React, { useState, useEffect } from "react"
import { ScrollView, StyleSheet, 
    Text, View, TextInput, Pressable, Switch } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";
import QRCode from 'react-native-qrcode-svg';
import DateTimePickerModal from "react-native-modal-datetime-picker";


/* Metodos de la api*/
import {getLastVaca, saveVaca} from '../apiRoutes/apiVaca'

export default function AddCow({ navigation, route }) {

    const [birthDateAux,setBirthDateAux] = useState('2022/07/16');
    const[cow,setCow] = useState({
        peso: 51.0, 
        fechaNacimiento: '2022/07/16',
        numeroPartos:3, 
        qr:'',
        parcelaUbicacion:'', 
        edadDestete:7, 
        aptaParaProduccion:0
    });

    useEffect(() => {
        setBirthDateAux(cow.fechaNacimiento);
        }, []);

        const textChange = (type,value) =>{
        setCow({
            ...cow,
            [type]:value,
        })
    }

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
        hideDatePicker();
        textChange("fechaNacimiento",formatDate(date));
        setBirthDateAux(formatDate(date));
    };

    

    const [existCow, setExistCow] = useState(false);
    const [idCow, setIdCow] = useState();

    const saveCow = async (vaca) => {
        //Guarda la vaca
        //const res = await saveVaca(cow);
        
        //Recupera el id de la vaca generada
        const lastVaca = await getLastVaca();
        var s = lastVaca.split(",");
        var s2 = s[0].split(":");
        console.log("LastVaca: "+s2[1]);

        setIdCow(s2[1]);
        //console.log("Cow: "+idCow);
        setExistCow(true);
        
        //navigation.goBack();
    }

    function resetCow() {
        setName('');
        setWeight(0);
        setBirth('');
        setCalving(0)
        setProduce(false);
        setUbication('')
    }
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        !isEnabled ? textChange("aptaParaProduccion",false) : textChange("aptaParaProduccion",true);
        console.log(cow.aptaParaProduccion);
    }

    return (
        <>
            <ScrollView style={{ backgroundColor: "#ffffff" }}>
                <View style={styles.formContainer}>
 
                    {/* Nacimiento*/}
                    <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
                    <View style={[styles.inputHorizontalContainer,{marginTop:"1%"}]}>
                        <TextInput placeholder="Seleccione una fecha" editable={true} keyboardType='number-pad'
                        value={birthDateAux}
                        style={styles.inputDate}/>
                        <Pressable style={styles.buttonSalir} backgroundColor={colors.QUINARY_COLOR} onPress={showDatePicker}> 
                            <Icon name="calendar" color={colors.SECONDARY_COLOR} size={25}/>
                        </Pressable>
                        <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                date={new Date(cow.fechaNacimiento)}
                                onCancel={hideDatePicker}
                        />
                    </View>

                    {/*  Peso */}
                    <Text style={styles.inputLabel}>Peso</Text>
                    <TextInput placeholder="Peso"  keyboardType="number-pad" style={styles.inputText} 
                    onChangeText={(val) => textChange("peso",val)} />
                    {/* partos */}
            
                    <Text style={styles.inputLabel}>Cantidad de partos</Text>
                    <TextInput placeholder="Cantidad de partos" keyboardType="decimal-pad" style={styles.inputText}
                        onChangeText={(val) => textChange("numeroPartos",val)} />

                    {/* ubicación */}
                    
                    <Text style={styles.inputLabel} >Ubicación</Text>
                    <TextInput placeholder="Parcelas" keyboardType="ascii-capable" style={styles.inputText} onChangeText={(val) => textChange("parcelaUbicacion",val)} />
                    
                    <Text style={styles.inputLabel}>Edad de destete</Text>
                    <TextInput placeholder="Edad destete" keyboardType="number-pad" style={styles.inputText}
                        onChangeText={(val) => textChange("edadDestete",val)} />

                    {/* produccion */}
                    <View style={styles.inputHorizontalContainer}>
                        <Text style={{paddingRight:20,fontSize:20}}>¿Está produciendo?</Text>
                        <Switch trackColor={{ false: "#767577", true: "#c7934e" }}
                            thumbColor={isEnabled ? "#271d14" : "#271d14"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}></Switch>
                    </View>

                    {/* Boton para agregar la vaca */}
                    <Pressable style={styles.buttonContainer} backgroundColor={colors.PRIMARY_COLOR} onPress={() => {saveCow(cow)}}> 
                            <Icon name="plus-box" style={{paddingRight:10}} color={colors.SECONDARY_COLOR} size={25}/>
                            <Text style={{ fontSize: 18 ,color:colors.SECONDARY_COLOR,fontWeight:"bold"}}>Agregar</Text>
                    </Pressable>

                    
                    {/* QR CODE */}
                    {existCow ? <QRCode value={idCow}codeStyle="square"/>: <></>}
                    
                    
                </View>
            </ScrollView>
        </>
    )
}

/**Los colores son : cafe oscuro: #271d14 para el fondo y blanco para los cuadros de texto */
/**pendiente mejorar el manejo de height y width */
const styles = StyleSheet.create({

    formContainer: {
        paddingHorizontal:25,
        paddingBottom:25,
        alignContent:"center"
    },
    inputLabel:{
        marginTop:"5%",
        fontSize:17
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
    inputDate: {
        fontSize: 20,
        paddingVertical:7,
        paddingLeft:15,
        paddingRight:30,
        borderRadius:10,
        marginTop: "3%",
        marginBottom:"0%",
        borderWidth:1,
        borderColor:colors.QUINARY_COLOR
    },
    inputHorizontalContainer: {
        marginTop: "5%",
        flexDirection:"row",
        fontSize: 20,
        alignItems: "center",
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
    buttonSalir:{
        flexDirection: "row",
        marginTop:"3%",
        marginStart:"-5%",
        paddingHorizontal:"3%",
        paddingVertical:"2.6%",
        backgroundColor:colors.QUINARY_COLOR,
        borderBottomLeftRadius:0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius:10,
        borderTopRightRadius: 10
    },
});