import Config from "react-native-config";
export const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
export const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
export const WEATHER_API_KEY = Config.WEATHER_API_KEY ?? '';
export const STORAGE_KEY_CITIES = 'citiesList';
export const STORAGE_DB_NAME = 'appDB';
