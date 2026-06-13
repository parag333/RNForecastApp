import { WEATHER_API_KEY, WEATHER_BASE_URL } from "../constants/config";
import { WeatherData } from "../models/weather";

export const fetchWeatherByCity = async(cityName: string) : Promise<WeatherData> => {
    const url = `${WEATHER_BASE_URL}?q=${cityName}&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url, {method:'GET'});
    if(!response.ok){
        throw new Error('API error');
    }
    const data: WeatherData = await response.json();
    return data;
}

// Promises - A representation of a value which can be available now, in future or never. 
// A way to write asynchronous program which is easily manageble and less error prone than callbacks

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if(success){
                resolve('Success');
            }else{
                reject('Error');
            }
        }, 1000);
    });
};

fetchData().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});


// Async await - A syntactic sugar over promises, making look async code sync and more clean and readble.

const fetchDataAsAsync = async() => {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

fetchDataAsAsync();

const fetchData1 = () => Promise.resolve('Data 1');
const fetchData2 = () => Promise.resolve('Data 2');

Promise.all([fetchData1, fetchData2]).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})