// import React from "react";
// import { View, Text, Image } from "react-native";

// // import QRCode from "react-native-qrcode-svg";
// import QRCode from 'qrcode';


// export default function HomeScreen() {


// const base64img = QRCode.toDataURL('hello world');


//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Image value={base64img} />
//     </View>
//   );
// }

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useRef } from "react";
import QRCode from "react-native-qrcode-svg";



const QR = ({ name }) => {
  let svg = useRef(null);

  const getDataURL = () => {
    svg?.toDataURL(callback);
    //console.log(svg);
  };

  function callback(dataURL) {
    console.log(dataURL);
  }

  return (
    <>
      <QRCode size={300} value={`${name}`} getRef={(c) => (svg = c)} />

      <Button onPress={getDataURL} title="Call Funct" color="#1FAAE2" />
    </>
  );
};
export default function HomeScreen() {
  const input = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <QR name="Holiiii" />
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