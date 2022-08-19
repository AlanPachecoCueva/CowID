import NavBar from './src/components/NavBar';
import Login from './src/components/Login';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'firebase/auth'
import {getAuth} from 'firebase/auth';

import "firebase/firestore";

function firebaseTest(){
  const db = firebase.firestore();
  var docRef = db.collection("Vacas").doc("YxsxjfdtSQ46YchXHOqN");

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}

export default function App(){

  const [user,setUser] = useState(undefined) 
  const auth = getAuth();
  useEffect(()=>{
    auth.onAuthStateChanged((response)=>{
      setUser(response)
    })
  },[]);

  //firebaseTest()

  if (user === undefined) return null;
  return(
    <NavigationContainer>
      {user? <NavBar/> : <Login setLogged = {setUser}/>}
    </NavigationContainer>);
}