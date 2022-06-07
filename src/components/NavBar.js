import React from 'react';
import Icon from 'react-native-ico-material-design';
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

export default function MyTabs() {
  return (
    <Tab.Navigator
     barStyle={{ paddingBottom: 48 }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
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
