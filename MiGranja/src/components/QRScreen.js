import {
  PermissionsAndroid,
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// import { BarCodeScanner } from 'expo-barcode-scanner';

// New barcodeScanner in replacement of expo-scanner
import BarcodeScanner from 'react-native-scan-barcode';
import colors from '../utils/colors';

export default function QRScan({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cowID, setCowID] = useState('Not yet scanned');

  //Pedir permiso de la camara
  const askCameraPermission = async () => {
    const {status} = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      setHasPermission(status == 'granted');
    } else if(status === PermissionsAndroid.RESULTS.DENIED) {
      console.log('Camera permission denied');
    }
  };

  //Ejecuta el pedir permisos al inicio de el componente
  useEffect(() => {
    askCameraPermission();
  }, []);

  function handleQrScanned(content) {
    setScanned(true);
    setCowID(content.data);

    alert('Vaca encontrada: ' + content.data);
    //alert("Vaca encontrada. Vaca: "+content.data+ ". QrType: "+content.type);

    //At the moment the navigation is sttoped

    //navigation.navigate("CowInfo", data);
  }

  const resetQR = () => {
    setScanned(false);
    setCowID('Not yet scanned');
  };

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        {scanned ? (
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: 'bold',
            }}>
            Contenido encontrado: {cowID}
          </Text>
        ) : (
          <BarcodeScanner
            onBarCodeRead={e => {
              handleQrScanned(e);
            }}
            style={{height: 600, width: 400}}
            cameraType={'back'}
          />
        )}
      </View>

      <Pressable
        style={styles.buttonContainer}
        backgroundColor={colors.PRIMARY_COLOR}
        onPress={() => resetQR()}>
        <Text
          style={{
            fontSize: 18,
            color: colors.SECONDARY_COLOR,
            fontWeight: 'bold',
          }}>
          Escanear de nuevo
        </Text>
      </Pressable>

      <Pressable
        style={styles.buttonContainer}
        backgroundColor={colors.PRIMARY_COLOR}
        onPress={() => askCameraPermission()}>
        <Text
          style={{
            fontSize: 18,
            color: colors.SECONDARY_COLOR,
            fontWeight: 'bold',
          }}>
          Dar Permisos
        </Text>
      </Pressable>
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
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: '10%',
    marginBottom: '5%',
    paddingVertical: '3%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 15,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color: '#fff',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    // backgroundColor: 'tomato',
    marginBottom: 30,
  },
});
