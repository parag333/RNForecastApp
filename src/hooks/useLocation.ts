import { useState, useCallback } from 'react';
import NativeLocationModule from '../specs/NativeLocationModule';

interface LocationCoords {
    lattitude: number;
    longitude: number;
}

interface UseLocationResult {
    location: LocationCoords | null;
    cityName: string;
    isLoading: boolean;
    error: string;
    detectLocation: () => Promise<void>;
}

const intArray: number[] = [1,2,3,4,5];

// ForEach - The forEach method adds a side effect on array, executes function on every element.

intArray.forEach(element => console.log(element));

// map - The map method adds a function on each array element and returns a new array

const double = intArray.map(element => element * 2);
console.log(`map new array = ${double}`);

// filter - The filter returns a new array which passes the test implemented by a provided function

const evenArray = intArray.filter(element => element % 2 == 0);
console.log(`filter new array = ${evenArray}`);

// reduce - The reducer function provided on each element resulting in single value in return

const sum = intArray.reduce((accumulator, currentValue) => accumulator +  currentValue, 0);
console.log(`sum = ${sum}`);

// find - The find method returns value of first element that satisfies provided function

const found = intArray.find(element => element > 2);
console.log(`found = ${found}`);

/**
 * Hook that wraps the NativeLocationModule TurboModule.
 *
 * Calls `getCurrentLocation()` to get GPS coordinates, then
 * `reverseGeocode()` to resolve them to a city name.
 *
 * Usage:
 * ```tsx
 * const { cityName, isLoading, error, detectLocation } = useLocation();
 * ```
 */

// export const useLocation = (): UseLocationResult => {
//     const [location, setLocation] = useState<LocationCoords | null>(null);
//     const [cityName, setCityName] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');

//     const detectLocation = useCallback(async () => {
//         try {
//             setIsLoading(true);
//             setError('');
//             setCityName('');

//             // 1. Get GPS coordinates from the native module
//             const coords = await NativeLocationModule.getCurrentLocation();
//             setLocation(coords);

//             // 2. Reverse geocode to get city name
//             const result = await NativeLocationModule.reverseGeocode(
//                 coords.lattitude,
//                 coords.longitude,
//             );
//             setCityName(result.cityName);
//         } catch (err: any) {
//             const message = err?.message ?? String(err);
//             setError(message);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     return { location, cityName, isLoading, error, detectLocation };
// };

const numArray : number[] = [1,2,3,4,5];

const mapArray = numArray.map(element => element * 2);
const summe = numArray.reduce((acc, cValue) => acc + cValue, 0);
console.log(summe);


const filter = numArray.filter(element => element % 2 == 0);


const newNumArr: number[] = [1,2,3,4,5];
const addition = newNumArr.reduce((acc, cValue) => acc + cValue, 0);
const mapArr = newNumArr.map(element => element * 2);
const filterArr = newNumArr.filter(element => element % 2 == 0);