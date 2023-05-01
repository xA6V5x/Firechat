import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';

type LoginScreenProps = {
     route: { params: { onGoogleButtonPress: () => void } };
};

export function LoginScreen({ route }: LoginScreenProps) {
     const { onGoogleButtonPress } = route.params;

     return (
          <View style={styles.container}>
               <Image source={require('../assets/images/chatIcon.png')} style={styles.chat_icon} />
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
