import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
     namespace ReactNavigation {
          interface RootParamList extends RootStackParamList {}
     }
}

export type RootStackParamList = {
     Login: {
          onGoogleButtonPress: () => void;
     };
     Firechat: {
          user: {
               displayName?: string;
               photoURL?: string;
          };
          singOut: () => void;
     };
     Chat: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
     RootStackParamList,
     Screen
>;
