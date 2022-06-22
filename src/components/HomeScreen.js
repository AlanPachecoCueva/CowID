// import React from "react";
// import { View, Text, Image } from "react-native";

// // import QRCode from "react-native-qrcode-svg";
 import qrc from 'qrcode';


// export default function HomeScreen() {


// const base64img = QRCode.toDataURL('hello world');


//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Image value={base64img} />
//     </View>
//   );
// }

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { useRef, useState } from "react";
import QRCode from "react-native-qrcode-svg";




const QR = (props) => {
  //let svg = useRef(null);
  let svg;


  const getDataURL = () => {
    svg?.toDataURL(callback);

    // console.log(svg["_reactInternals"]["tag"]);
    // console.log("Tipo de datos del svg: "+typeof(svg));
    // qrc.toDataURL(svg, function(err, url){
    //   console.log("Esta es la url: "+ url);
    //   props.qrData(url);
    // });
  };

  function callback(dataURL) {
    props.qrData('data:image/png;base64,'+dataURL);
    console.log("Tipo de dato dataURL:" + typeof(dataURL));
    console.log(dataURL);
  }

  return (
    <>
      <QRCode size={300} value={`${props.name}`} getRef={(c) => (svg = c)}  />

      <Button onPress={getDataURL} title="Call Funct" color="#1FAAE2" />
    </>
  );
};
export default function HomeScreen() {
  const input = useRef<TextInput>(null);

  const [qrDataUrl, setQrDataUrl] = useState(null);
  
  console.log("JEJE: "+qrDataUrl);

  return (
    <View style={styles.container}>
      <Text>Escribe el contenido del QR</Text>
      
      <QR qrData ={setQrDataUrl} name="Holiiii" style={{display: 'none'}}/>
      <Text>Imagen</Text>
      <Image source={{uri: qrDataUrl}} style={{width:300, height:300}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});