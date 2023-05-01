import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { useState } from 'react';

type FirechatScreenProps = {
     route: {
          params: {
               user: {
                    displayName?: string;
                    photoURL?: string;
               };
               singOut: () => void;
          };
     };
     navigation: any;
};

export function FirechatScreen({ route, navigation }: FirechatScreenProps) {
     const { user, singOut } = route.params;
     const [isSingOut, setSingOut] = useState(false);
     const handleSingOut = async () => {
          setSingOut(true);
          await singOut();
          setSingOut(false);
     };
     return (
          <View style={styles.container}>
               <Text style={styles.text}>Welcome {user.displayName}</Text>
               <Image source={{ uri: user.photoURL }} style={styles.photoURL} />
               <TouchableOpacity
                    style={styles.button_sing_out}
                    onPress={() => navigation.navigate('Chat')}
               >
                    <Text style={styles.button_text}>Chat</Text>
               </TouchableOpacity>
               <TouchableOpacity
                    style={styles.button_sing_out}
                    onPress={() => (!isSingOut ? handleSingOut() : null)}
               >
                    <Text style={styles.button_text}>Sing Out</Text>
               </TouchableOpacity>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
     },
     photoURL: { width: 100, height: 100, borderRadius: 100 },
     text: {
          color: '#000000',
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
     },
     button_sing_out: {
          marginTop: 15,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 8,
          backgroundColor: '#7c33b4',
          width: '80%',
          height: 40,
     },
     button_text: {
          fontWeight: '500',
          color: '#ffff',
     },
});
