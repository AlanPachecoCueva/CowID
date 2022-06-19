import React from "react";
import { View, Text } from "react-native";

import QRCode from "react-native-qrcode-svg";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <QRCode value={"string"} />
    </View>
  );
}
