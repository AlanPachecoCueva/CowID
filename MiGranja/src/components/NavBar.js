import React from "react";

// Componentes
import QRScan from "./QRScreen";
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CowInfo from "./CowInfo";
import Statistics from "./Statistics"
import AddCow from "./AddCow";
import CowScreen from "./CowScreen";

import colors from "../utils/colors";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { shadow } from 'react-native-paper';
import { NOT_INITIALIZED_ERROR } from "@react-navigation/core/lib/typescript/src/createNavigationContainerRef";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = {
  name: "HomeScreen", title: "Home"
};
const QR = {
  name: "QRScreen", title: "QR"
};
const Cows = {
  name: "CowScreen", title: "Lista de vacas"
};
const Profile = {
  name: "Profilecreen", title: "Perfil"
};
const CowCreation = {
  name: "AddCow", title: "Nueva vaca"
};
const CowInfoScreen = {
  name: "CowInfo", title: "Información"
};
const NavigationBar = {
  name: "Navegacion", title: "Navegacion"
}



function QRHandler() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={QR.name} component={QRScan} options={{ title: QR.title }} />
      <Stack.Screen name={CowInfoScreen.name} component={CowInfo} options={{ title: CowInfoScreen.title }} />
    </Stack.Navigator>
  )
}

function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName={Home.name}
      screenOptions={{
        headerShown: false
      }}
      tabBarOptions={{
        
        activeTintColor: colors.QUINARY_COLOR,
        inactiveTintColor: colors.INACTIVE_ICON,
        shifting: true,
        style: {
          ...styles.Navbar,
        },
      }}

    >
      <Tab.Screen
        name={Home.name}
        component={Statistics}
        headerShown={false}
        options={{
          tabBarLabel: Home.title,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={"QR"}
        component={QRHandler}
        options={{
          tabBarLabel: QR.title,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen name="Vacas"
        component={CowScreen}
        options={{
          tabBarLabel: CowScreen.title,
          tabBarItemStyle: { color: "#000" },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cow"
              color={color}
              size={24}
            />
          ),
        }}
      />



      <Tab.Screen
        name={Profile.name}
        component={ProfileScreen}
        options={{
          tabBarLabel: Profile.title,
          
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator >
  );


}
export default function CowHandler() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationBar.name} component={NavBar} screenOptions={{headerShown:false}}/>
      <Stack.Screen name={Cows.name} component={CowScreen} options={{ title: Cows.title }} />
      <Stack.Screen name={CowCreation.name} component={AddCow} options={{ title: "Agregar vaca" }} />
      <Stack.Screen name={CowInfoScreen.name} component={CowInfo} options={{ title: CowInfoScreen.title }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center'

  },
  shadow: {
    shadowColor: "#c7934e",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 3.5,
    shadowOpacity: 0.25,
    elevation: 5
  },
  Navbar: {
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    elevation: 0,
    backgroundColor: colors.QUATERNARY_COLOR,
    borderRadius: 15,
    height: 70,
    overflow: 'hidden',
    ...shadow
  }
});
