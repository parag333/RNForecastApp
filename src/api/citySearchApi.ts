import { WEATHER_API_KEY, GEO_BASE_URL } from "../constants/config";
import { CitySearchResult } from "../models/searchResults";

export const fetchCityForSearch = async (query: string): Promise<CitySearchResult[]> => {
    const url = `${GEO_BASE_URL}?q=${query}&limit=5&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url, {method: 'GET'});
    if(!response.ok){
        throw new Error(`API error, No weather data found. - ${response.status}`,);
    }
    const data: CitySearchResult[] = await response.json();
    return data;
}