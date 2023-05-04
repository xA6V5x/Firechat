import { Image, StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React from 'react';

type FirechatScreenProps = {
     route: {
          params: {
               user: {
                    displayName?: string;
                    photoURL?: string;
               };
          };
     };
     navigation: any;
};

export function FirechatScreen({ route, navigation }: FirechatScreenProps) {
     const { user } = route.params;
     const chats = [
          'Grupito de Agus',
          'Grupo Relleno',
          'Negocios',
          'Alguien',
          'Alguien mas',
          'Lalala',
     ];

     return (
          <ScrollView>
               <View style={styles.container}>
                    <View style={styles.header}>
                         <Image source={{ uri: user.photoURL }} style={styles.photoURL} />
                         <Text style={styles.text}>Welcome {user.displayName}</Text>
                    </View>
                    <View style={styles.line}></View>
                    {chats.map((name, index) => {
                         return (
                              <TouchableOpacity
                                   key={index}
                                   style={styles.button_chat}
                                   activeOpacity={0.8}
                                   onPress={() => navigation.navigate('Chat')}
                              >
                                   <Text style={styles.button_text}>{name}</Text>
                              </TouchableOpacity>
                         );
                    })}
               </View>
          </ScrollView>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     header: {
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
     },
     photoURL: { width: 100, height: 100, borderRadius: 100 },
     text: {
          width: '50%',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
     },
     line: {
          margin: 10,
          marginHorizontal: 20,
          height: 1,
          backgroundColor: '#ffffff',
     },
     button_chat: {
          marginBottom: 10,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 8,
          backgroundColor: '#7c33b4',
          height: 50,
     },
     button_text: {
          fontWeight: '500',
          color: '#ffff',
     },
});
