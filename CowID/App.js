import NavBar from './src/components/NavBar';
import Login from './src/components/Login';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'firebase/auth'
import {getAuth} from 'firebase/auth';

export default function App(){

  const [user,setUser] = useState(undefined) 
  const auth = getAuth();
  useEffect(()=>{
    auth.onAuthStateChanged((response)=>{
      setUser(response)
    })
  },[]);

<<<<<<< HEAD
=======

>>>>>>> ad087f5a03cd006d606a94ab3a2bd562cb950136
  if (user === undefined) return null;
  return(
    <NavigationContainer>
      {user? <NavBar/> : <Login setLogged = {setUser}/>}
    </NavigationContainer>);
}