import { useEffect, useState } from "react";
import { fetchCityForSearch } from "../api/citySearchApi";
import { CitySearchResult } from "../models/searchResults";
import useDebounce from "./useDebounce";

export const useCitySearch = (searchText: string) => {
    const [searchData, setSearchData] = useState<CitySearchResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const debouncedText = useDebounce(searchText, 400);
    
    useEffect(() => {
        if(debouncedText.trim().length < 2) return;
        const search = async () => {
            try{
                setIsLoading(true);
                setErrorMessage('');
                const data = await fetchCityForSearch(debouncedText);
                setSearchData(data);
            }catch(error: any){
                setErrorMessage(error?.message ?? String(error));
            }finally{
                setIsLoading(false);
            }
        };
        search();

    }, [debouncedText]);

    const clearResults = () => {
      setSearchData([]);
    };

    return { searchData, isLoading, errorMessage, clearResults};
};