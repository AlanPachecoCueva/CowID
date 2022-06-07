import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import NavBar from './src/components/NavBar';
import Login from './src/components/Login';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();


function LoadApp(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <Login/>;
  }
  return <NavBar/>;
}

export default function App(){

  const state= {
    user:'',
    page:'',
    userLogged: false
  }

  return(
  <NavigationContainer>
  
    <LoadApp isLoggedIn = {false}/>
    </NavigationContainer>);
}