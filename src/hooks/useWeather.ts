import { use, useEffect, useState } from "react";
import { WeatherData } from "../models/weather";
import { fetchWeatherByCity } from "../api/weatherApi";

// export const useWeather = (cityName: string) => {
//     const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [errorMessage, setErrorMessage] = useState<string>('');

//     useEffect(() => {
//         if(!cityName) return;

//         const load = async () => {
//             try{
//                 setIsLoading(true);
//                 setErrorMessage('');
//                 const data = await fetchWeatherByCity(cityName);
//                 setWeatherData(data);
//             }catch(error: any){
//                 setErrorMessage(error?.message ?? String(error));
//             }finally{
//                 setIsLoading(false);
//             }
//         };

//         load();

//     }, [cityName]);

//     return { weatherData, isLoading, errorMessage};
// };

export const useWeather = (cityName: string) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        if(!cityName) return;

        const fetchData = async() =>{
            try {
                setIsLoading(true);
                setErrorMessage('');
                const data = await fetchWeatherByCity(cityName);
                setWeatherData(data);
            } catch (error: any) {
                setErrorMessage(error?.message ?? String(error)); 
            }finally{
                setIsLoading(false);
            }
        }

        fetchData();

    }, [cityName]);

    return {weatherData, isLoading, errorMessage};
};