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

  if (user === undefined) return null;
  return(
    <NavigationContainer>
      {user? <NavBar/> : <Login setLogged = {setUser}/>}
    </NavigationContainer>);
}

  // return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
//  };
