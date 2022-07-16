import React, { useState, useEffect, useRef } from "react"
import { ScrollView, StyleSheet, PermissionsAndroid,Platform, Image,
    Text, View, TextInput, Pressable, Switch, TouchableOpacity, Alert } from "react-native";

    //Para guardar imagen
    
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";
import QRCode from 'react-native-qrcode-svg';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {captureRef} from 'react-native-view-shot';

import * as MediaLibrary from 'expo-media-library'
/* Metodos de la api*/
import {getLastVaca, saveVaca} from '../apiRoutes/apiVaca';

export default function AddCow({ navigation, route }) {
// create a ref


    const componentRef = useRef();

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

    // get permission on android
  const getPermissionAndroid = async () => {
     try {
       const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         {
           title: 'Image Download Permission',
           message: 'Your permission is required to save images to your device',
           buttonNegative: 'Cancel',
           buttonPositive: 'OK',
         },
       );
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         return true;
       }
       Alert.alert(
         '',
         'Your permission is required to save images to your device',
         [{text: 'OK', onPress: () => {}}],
         {cancelable: false},
       );
     } catch (err) {
       // handle error as you please
       console.log('err', err);
     }
    //const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

  };

  

    const [existCow, setExistCow] = useState(false);
    const [idCow, setIdCow] = useState();
    const [qr, setQr] = useState(false);
    
    // download image
  const downloadImage = async () => {
    try {
      const uri = await captureRef(componentRef, {
        format: 'png',
        quality: 1,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      // cameraroll saves image
    //  const image = await CameraRoll.save
    const image = MediaLibrary.saveToLibraryAsync(uri);
      if (image) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };
    const saveCow = async (vaca) => {
        //Guarda la vaca
        const res = await saveVaca(vaca);
        
        //Recupera el id de la vaca generada
        const lastVaca = await getLastVaca();
        var s = lastVaca.split(",");
        var s2 = s[0].split(":");

        console.log("LastVaca: "+s2[1]);
        setQr(true);
        setIdCow(s2[1]);
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
            <View
              style={[styles.inputHorizontalContainer, { marginTop: "1%" }]}
            >
              <TextInput
                placeholder="Seleccione una fecha"
                editable={true}
                keyboardType="number-pad"
                value={birthDateAux}
                style={styles.inputDate}
              />
              <Pressable
                style={styles.buttonSalir}
                backgroundColor={colors.QUINARY_COLOR}
                onPress={showDatePicker}
              >
                <Icon
                  name="calendar"
                  color={colors.SECONDARY_COLOR}
                  size={25}
                />
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
            <TextInput
              placeholder="Peso"
              keyboardType="number-pad"
              style={styles.inputText}
              onChangeText={(val) => textChange("peso", val)}
            />
            {/* partos */}

            <Text style={styles.inputLabel}>Cantidad de partos</Text>
            <TextInput
              placeholder="Cantidad de partos"
              keyboardType="decimal-pad"
              style={styles.inputText}
              onChangeText={(val) => textChange("numeroPartos", val)}
            />

            {/* ubicación */}

            <Text style={styles.inputLabel}>Ubicación</Text>
            <TextInput
              placeholder="Parcelas"
              keyboardType="ascii-capable"
              style={styles.inputText}
              onChangeText={(val) => textChange("parcelaUbicacion", val)}
            />

            <Text style={styles.inputLabel}>Edad de destete</Text>
            <TextInput
              placeholder="Edad destete"
              keyboardType="number-pad"
              style={styles.inputText}
              onChangeText={(val) => textChange("edadDestete", val)}
            />

            {/* produccion */}
            <View style={styles.inputHorizontalContainer}>
              <Text style={{ paddingRight: 20, fontSize: 20 }}>
                ¿Está produciendo?
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#c7934e" }}
                thumbColor={isEnabled ? "#271d14" : "#271d14"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              ></Switch>
            </View>

            {/* Boton para agregar la vaca */}
            <Pressable
              style={styles.buttonContainer}
              backgroundColor={colors.PRIMARY_COLOR}
              onPress={() => {
                saveCow(cow);
              }}
            >
              <Icon
                name="plus-box"
                style={{ paddingRight: 10 }}
                color={colors.SECONDARY_COLOR}
                size={25}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: colors.SECONDARY_COLOR,
                  fontWeight: "bold",
                }}
              >
                Agregar
              </Text>
            </Pressable>

            {/* QR CODE */}
            {existCow ? 
              <>
              <View style={styles.qrStyle}>
                <Text style={styles.textQr}>Descarga tu código QR!</Text>
                <View collapsable={false} style={styles.viewQr} ref={componentRef} >

                  <QRCode style={styles.qr} value={idCow} codeStyle="square" /> 

                </View>   

              </View>
                               
                
                <TouchableOpacity onPress={downloadImage}>
                  <Text>Save</Text>
                </TouchableOpacity>

               </>
             : 
              <></>
            }
          </View>
        </ScrollView>
      </>
    );
}

/**Los colores son : cafe oscuro: #271d14 para el fondo y blanco para los cuadros de texto */
/**pendiente mejorar el manejo de height y width */
const styles = StyleSheet.create({
    qrStyle:{
        marginTop:"20%",
        justifyContent:"space-between",
        //marginLeft:"35%",
        padding:0
    },
    viewQr:{
      padding:0,
      margin:0
    },
    qr:{
      padding:0,
      backgroundColor:"#fff",
    },
    textQr:{
        fontWeight:"bold",
        marginLeft:"-10%",
        marginBottom:"10%"
    },
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