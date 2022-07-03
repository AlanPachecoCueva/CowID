import React from "react";

// Componentes
import QRScan from "./QRScreen";
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CowInfo from "./CowInfo";
import Statistics from "./Statistics"

import colors from "../utils/colors";
import {StyleSheet} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { shadow } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const Home ={
  name:"HomeScreen", title:"Home"
};
const QR ={name:"QRScreen", title:"QR"
};
const Cows = {name:"CowInfo", title:"Vacas"
};
const Profile = {name:"Profilecreen", title:"Perfil"
};


export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName= {Home.name}
      tabBarOptions={{
        activeTintColor:colors.QUINARY_COLOR,
        inactiveTintColor:colors.INACTIVE_ICON,
        shifting: true,
        style: {
          ...styles.Navbar,
        },
      }}
    >
      <Tab.Screen
        name= {Home.name}
        component={Statistics}
        options={{
          tabBarLabel: Home.title,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={QR.name}
        component={QRScan}
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
      <Tab.Screen
        name={Cows.name}
        component={CowInfo}
        options={{
          tabBarLabel: Cows.title,
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
          tabBarLabel:Profile.title,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.PRIMARY_COLOR,
        alignItems:'center',
        justifyContent: 'center'

    },
    shadow:{
      shadowColor:"#c7934e",
      shadowOffset:{
        width:0,
        height:10,
      },
      shadowRadius:3.5,
      shadowOpacity:0.25,
      elevation:5
    },
    Navbar:{
        paddingBottom: 10,
        paddingTop:10,
        marginBottom: 15,
        marginHorizontal:15,
        elevation:0,
        backgroundColor:colors.QUATERNARY_COLOR,
        borderRadius:15,
        height:70,
        overflow: 'hidden',
        ...shadow
    }
});