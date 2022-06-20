import NavBar from './src/components/NavBar';
import Login from './src/components/Login';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';


function LoadApp(props) {
  const isLoggedIn = props.isLoggedIn;
  if (!isLoggedIn) {
    return <Login setLogged = {props.setLogged}/>;
  }
  return <NavBar/>;
}

export default function App(){

  const state= {
    user:'',
    page:'',
    userLogged: false
  }

function handleLogeddStateChange(st) {
  setUserLogged(st)
}




  const [userLogged,setUserLogged] = useState(false)
  const [user,setUser] = useState(null)
 
  return(
  <NavigationContainer>
    <LoadApp isLoggedIn = {userLogged} setLogged = {handleLogeddStateChange}/>
  </NavigationContainer>);
}