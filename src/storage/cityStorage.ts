import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import { STORAGE_DB_NAME, STORAGE_KEY_CITIES } from "../constants/config";
import { City } from "../models/city";


const storage = createAsyncStorage(STORAGE_DB_NAME);

export const getCities = async (): Promise<City[]> => {
    const raw = await storage.getItem(STORAGE_KEY_CITIES);
    return raw ? JSON.parse(raw) : [];
};

export const saveCities = async (cities: City[]): Promise<void> => {
    await storage.setItem(STORAGE_KEY_CITIES, JSON.stringify(cities));
};