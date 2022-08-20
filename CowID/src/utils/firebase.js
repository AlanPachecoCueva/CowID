import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtM27TfqDg6J2nLROgUJqRcRfwa_c0zAs",
  authDomain: "cow-id-b4908.firebaseapp.com",
  projectId: "cow-id-b4908",
  storageBucket: "cow-id-b4908.appspot.com",
  messagingSenderId: "543420436842",
  appId: "1:543420436842:web:fd167bc6dffc6f93a89513"
};

export function Store(){
  const app = initializeApp(firebaseConfig);

  return getFirestore(app);
}

export default  firebase.initializeApp(firebaseConfig);
