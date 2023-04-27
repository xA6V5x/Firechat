import { Image, StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import { FirechatScreen } from './FirechatScreen';

type userProps = {
     displayName: string;
     photoURL: string;
};

export function LoginScreen() {
     GoogleSignin.configure({
          webClientId: '340926097781-9os57ah5bpe8m91p7i9d39rdvm0hhv5h.apps.googleusercontent.com',
     });

     const [initializing, setInitializing] = useState<boolean>(true);
     const [user, setUser] = useState<userProps>();
     const [isSingOut, setSingOut] = useState<boolean>(false);

     function onAuthStateChanged(user: userProps) {
          setUser(user);
          if (initializing) setInitializing(false);
     }

     useEffect(() => {
          const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
          return subscriber;
     }, []);

     const onGoogleButtonPress = async () => {
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          // Sign-in the user with the credential
          const user_sing_in = auth().signInWithCredential(googleCredential);
          user_sing_in
               .then((user) => {
                    // console.log(user);
               })
               .catch((error) => {
                    console.log(error);
               });
     };

     const singOut = async () => {
          setSingOut(true);
          try {
               await GoogleSignin.revokeAccess();
               await auth().signOut();
               setSingOut(false);
          } catch (error) {
               setSingOut(false);
               console.error(error);
          }
     };

     if (initializing) return null;

     if (!user) {
          return (
               <View style={styles.container}>
                    <Image
                         source={require('../assets/images/chatIcon.png')}
                         style={styles.chat_icon}
                    />
                    <Text style={styles.text}>Firechat</Text>
                    <TouchableOpacity
                         activeOpacity={0.9}
                         style={styles.button}
                         onPress={() => onGoogleButtonPress()}
                    >
                         <Image
                              source={require('../assets/images/googleIcon.png')}
                              style={styles.button_image}
                         />
                         <Text style={styles.button_text}>Continuar con Google</Text>
                    </TouchableOpacity>
               </View>
          );
     }
     return <FirechatScreen user={user} isSingOut={isSingOut} singOut={singOut} />;
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#7c33b4',
     },
     chat_icon: {
          margin: 10,
          width: 150,
          height: 150,
     },
     text: {
          color: '#ffffff',
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: -30,
          marginLeft: 100,
          marginBottom: 25,
     },
     go_home: {
          marginTop: 20,
          marginBottom: 20,
          fontWeight: '300',
          backgroundColor: '#ffffff',
          width: '80%',
          borderRadius: 8,
          height: 40,
          textAlign: 'center',
          textAlignVertical: 'center',
     },
     button: {
          position: 'relative',
          marginBottom: 60,
          width: '80%',
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 8,
          backgroundColor: '#ffffff',
     },
     button_image: {
          position: 'absolute',
          left: '8%',
          width: 15,
          height: 15,
     },
     button_sing_out: {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 8,
          backgroundColor: '#ffffff',
          width: '80%',
          height: 40,
     },
     button_text: {
          fontWeight: '300',
          color: 'black',
     },
});
