import React from "react";

// Componentes
import QRScan from "./ScanQR";
import HomeScreen from './HomeScreen';
import ProfilseScreen from './ProfileScreen';

import colors from "../utils/colors";
import { StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        shifting: true,
        style: {
          ...styles.Navbar,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={QRScan}
        options={{
          tabBarLabel: "QR",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilseScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cf1414",
    alignItems: "center",
    justifyContent: "center",
  },
  Navbar: {
    marginBottom: 15,
    marginHorizontal: 15,
    elevation: 0,
    backgroundColor: colors.TERTIARY_COLOR,
    borderRadius: 30,
    height: 50,
    overflow: "hidden",
  },
});
