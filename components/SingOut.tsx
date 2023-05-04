import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

type SingOutProps = {
     singOut: () => void;
};

export function SingOut({ singOut }: SingOutProps) {
     const [isSingOut, setSingOut] = useState(false);
     const handleSingOut = async () => {
          setSingOut(true);
          await singOut();
          setSingOut(false);
     };
     return (
          <TouchableOpacity
               style={styles.container}
               onPress={() => (!isSingOut ? handleSingOut() : null)}
          >
               <Image source={require('../assets/images/singOut.png')} style={styles.icon} />
          </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
     container: {
          alignItems: 'center',
          justifyContent: 'center',
     },
     icon: {
          width: 20,
          height: 20,
     },
});
