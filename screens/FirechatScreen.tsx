import { Image, StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';

type FirechatScreenProps = {
     user: {
          displayName: string;
          photoURL: string;
     };
     isSingOut: boolean;
     singOut: () => void;
};

export function FirechatScreen({ user, isSingOut, singOut }: FirechatScreenProps) {
     return (
          <View style={styles.container}>
               <Text style={styles.text}>Welcome {user.displayName}</Text>
               <Image
                    source={{ uri: user.photoURL }}
                    style={{ width: 100, height: 100, borderRadius: 100 }}
               />
               <TouchableOpacity
                    style={styles.button_sing_out}
                    onPress={() => (!isSingOut ? singOut() : null)}
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
     chat_icon: {
          margin: 10,
          width: 150,
          height: 150,
     },
     text: {
          color: '#000000',
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
     },
     button_sing_out: {
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
