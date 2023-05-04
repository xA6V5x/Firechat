import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';
import { RootStackParamList } from './types';
import React, { useState, useEffect, ReactElement } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { FirechatScreen } from '../screens/FirechatScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { SingOut } from '../components/SingOut';

type LoginNavigatorProps = {
     onGoogleButtonPress: () => void;
};

type RootNavigatorProps = {
     user: {
          displayName?: string;
          photoURL?: string;
     };
     SingOutButton: ReactElement;
};

type userProps = {
     displayName?: string;
     photoURL?: string;
};

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
     GoogleSignin.configure({
          webClientId: '340926097781-9os57ah5bpe8m91p7i9d39rdvm0hhv5h.apps.googleusercontent.com',
     });

     const [initializing, setInitializing] = useState<boolean>(true);
     const [user, setUser] = useState<userProps>({});

     const isAuthStateChanged = (userData: any) => {
          setUser(userData);
          if (initializing) {
               setInitializing(false);
          }
     };

     useEffect(() => {
          const subscriber = auth().onAuthStateChanged(isAuthStateChanged);
          return subscriber;
     });

     const onGoogleButtonPress = async () => {
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          // Sign-in the user with the credential
          auth().signInWithCredential(googleCredential);
     };

     const singOut = async () => {
          try {
               await GoogleSignin.revokeAccess();
               await auth().signOut();
          } catch (error) {
               console.error(error);
          }
     };

     if (initializing) {
          return null;
     }

     return (
          <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
               {!user ? (
                    <LoginNavigator onGoogleButtonPress={onGoogleButtonPress} />
               ) : (
                    <RootNavigator user={user} SingOutButton={<SingOut singOut={singOut} />} />
               )}
          </NavigationContainer>
     );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function LoginNavigator({ onGoogleButtonPress }: LoginNavigatorProps) {
     return (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
               <Stack.Screen
                    name="Login"
                    initialParams={{ onGoogleButtonPress }}
                    component={LoginScreen}
                    options={{ headerShown: false, animation: 'none' }}
               />
          </Stack.Navigator>
     );
}

function RootNavigator({ user, SingOutButton }: RootNavigatorProps) {
     return (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
               <Stack.Screen
                    name="Firechat"
                    initialParams={{ user }}
                    component={FirechatScreen}
                    options={{
                         headerShown: true,
                         headerRight: () => SingOutButton,
                    }}
               />
               <Stack.Screen
                    name="Chat"
                    initialParams={{ user }}
                    component={ChatScreen}
                    options={{
                         title: 'Grupito de Agus',
                         headerShown: true,
                         animation: 'slide_from_right',
                    }}
               />
          </Stack.Navigator>
     );
}
