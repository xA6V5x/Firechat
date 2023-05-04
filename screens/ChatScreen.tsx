import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

type ChatScreenProps = {
     route: {
          params: {
               user: {
                    uid?: string;
                    email?: string;
                    displayName?: string;
                    photoURL?: string;
               };
          };
     };
};

export function ChatScreen({ route }: ChatScreenProps) {
     const { user } = route.params;

     const [messages, setMessages] = useState([]);

     const onResult = (QuerySnapshot) => {
          QuerySnapshot._docs.length > 0 &&
               setMessages(
                    QuerySnapshot._docs.map((doc) => ({
                         _id: doc.data()._id,
                         createdAt: doc.data().createdAt.toDate(),
                         text: doc.data().text,
                         user: doc.data().user,
                    }))
               );
     };

     const onError = (error) => {
          console.error(error);
     };

     useLayoutEffect(() => {
          const suscribe = firestore()
               .collection('chats')
               .orderBy('createdAt', 'desc')
               .onSnapshot(onResult, onError);
          return suscribe;
     });

     const onSend = useCallback((menssages = []) => {
          setMessages((previusMenssages) => GiftedChat.append(previusMenssages, menssages));
          const { _id, createdAt, text, user } = menssages[0];
          firestore().collection('chats').add({ _id, createdAt, text, user });
     }, []);

     return (
          <GiftedChat
               messages={messages}
               onSend={(message) => onSend(message)}
               user={{ _id: user.email ? user.email : '', avatar: user.photoURL }}
               textInputProps={{ style: styles.textInput }}
          />
     );
}

const styles = StyleSheet.create({
     textInput: { flex: 1, marginLeft: 8, color: 'black', fontSize: 16 },
});
