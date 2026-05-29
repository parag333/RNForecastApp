import { WEATHER_API_KEY, WEATHER_BASE_URL } from "../constants/config";
import { WeatherData } from "../models/weather";

export const fetchWeatherByCity = async (cityName: string): Promise<WeatherData> => {
    const url = `${WEATHER_BASE_URL}?q=${cityName}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url, {method: 'GET'});
    if(!response.ok){
        throw new Error(`API error, No weather data found. - ${response.status}`,);
    }
    const data: WeatherData = await response.json();
    return data;
}