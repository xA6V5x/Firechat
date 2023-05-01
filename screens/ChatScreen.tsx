import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export function ChatScreen() {
     return (
          <View style={styles.container}>
               <Text style={styles.text}>Chat screen</Text>
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
