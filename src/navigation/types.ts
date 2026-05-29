import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    WeatherInfo: { searchCity: string};
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type WeatherInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'WeatherInfo'>;

