import {View, Text, Button,StyleSheet} from 'react-native';
import React ,{useState, useEffect}from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScan({navigation}) {

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

    const handleQrScanned = ({type, data}) =>{
        setScanned(true);
        setCowID(data);
        alert('Vaca encontrada',`Vaca #${data}`);
        navigation.navigate("CowInfo", data);
    };

    const resetQR = () =>{
        setScanned(false);
        alert('Escanear de nuevo','Ahora puedes volver a escanear un código');
    };
    
    

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
                    onBarCodeScanned={scanned ? undefined : handleQrScanned}
                    style={{height:400, width:400}}
                />
            </View>
            <Button title={'Escanear de nuevo'} onPress={() => resetQR()} color='black'/>
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