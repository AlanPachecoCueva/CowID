import React from 'react';
import QRScan from './ScanQR'
import {StyleSheet,View, Text} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

export default function NavBar() {
  return (
      <Tab.Navigator
          initialRouteName="Feed"
          activeColor="white"
          labeled = {false}
          barStyle={{ backgroundColor: 'green' }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="QR"
            component={QRScan}
            options={{
              tabBarLabel: 'Updates',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="qrcode-scan" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
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
        backgroundColor:'#cf1414',
        alignItems:'center',
        justifyContent: 'center'

    },
    NavBarContainer: {
        position:'absolute',
        bottom: 20,
        width:"90%",
    },
    Navbar:{
        felxDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent: 'space-evenly',
        borderRadius: 40
    },

    IconBehave: {
        padding:14
    }

});
