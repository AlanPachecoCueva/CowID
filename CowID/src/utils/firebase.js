import firebase from 'firebase/compat/app';
import {getStorage,ref, uploadBytes} from 'firebase/storage';

const storage = getStorage();

const firebaseConfig = {
  apiKey: "AIzaSyDtM27TfqDg6J2nLROgUJqRcRfwa_c0zAs",
  authDomain: "cow-id-b4908.firebaseapp.com",
  projectId: "cow-id-b4908",
  storageBucket: "cow-id-b4908.appspot.com",
  messagingSenderId: "543420436842",
  appId: "1:543420436842:web:fd167bc6dffc6f93a89513"
};

export default  firebase.initializeApp(firebaseConfig);

/*export async function upload(image,currentUser,setLoading){
    const imgRef = ref(storage,currentUser.uid + '.png');
    setLoading(true);
    const snapshot = await uploadBytes(imgRef,image);
    setLoading(false);
    alert("Imagen subida correctamente");
}*/