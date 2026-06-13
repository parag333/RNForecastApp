import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    WeatherInfo: { searchCity: string};
    RealTimeChat: undefined;
};

export type LoginPageProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type WeatherInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'WeatherInfo'>;
export type RealTimeChatPageProps = NativeStackScreenProps<RootStackParamList, 'RealTimeChat'>;


