import {View, Text, Button,StyleSheet} from "react-native";
import React ,{useState, useEffect}from "react";
import { BarCodeScanner } from "expo-barcode-scanner";


export default function QRScan() {

    const [hasPermission, setHasPermission] = useState(null) 
    const [scanned,setScanned]  = useState(false)
    const [cowID,setCowID] = useState('Not yet scanned')

    //Pedir permiso de la camara
    const askCameraPermission = () =>{
        (
            async() =>{
                //Pregunta por permiso
                const {status} = await BarCodeScanner.requestPermissionsAsync();
                //Define el estado
                setHasPermission(status =='granted')
            }
        )()
    }

    //Ejecuta el pedir permisos al inicio de el componente
    useEffect(() =>{
        askCameraPermission();
    }, []
    );

    const handleQrScanned = ({type,data}) =>{
        setScanned(true);
        setCowID(data);
        alert(`Bar code with type ${type} and data ${data}  has been scanned!`);
    }

    const hola = () =>{
        'hola'
    }
    
    

    if(hasPermission === null){
        return(
            <View style={styles.container}> 
                <Text>Request camera permission</Text>
            </View>
        )
    }

    if(hasPermission === false){
        return(
            <View style={styles.container}> 
                <Text>Request camera permission</Text>
                <Button title={'Dar permiso camara'} onPress={askCameraPermission()} />
            </View> 
        )
    } 

    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned? hola:handleQrScanned}
                    style={{height:400, width:400}}
                />
            </View>
            <Button title={'Escanear de nuevo'}
            onPress={() => setScanned(false)} color='black'/>
        </View>
    );

 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    maintext: {
        fontSize: 16,
        margin: 20,
        color: '#fff'
      },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    }
    
});