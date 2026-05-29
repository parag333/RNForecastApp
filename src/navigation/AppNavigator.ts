import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

export const Stack = createNativeStackNavigator<RootStackParamList>();