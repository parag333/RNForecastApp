import { useEffect, useState } from 'react';
import { City } from '../models/city';
import { getCities, saveCities } from '../storage/cityStorage';

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = await getCities();
      setCities(stored);
    };
    load();
  }, []);

  const addCity = async (nane: string) => {
    const updated = [...cities, { name: nane, id: Date.now(), checked: false }];
    await saveCities(updated);
    setCities(updated);
  };

  const deleteCity = async (cityId: number) => {
    const updated = cities.filter(item => item.id !== cityId);
    await saveCities(updated);
    setCities(updated);
  };

  const deleteSelected = async () => {
    const updated = cities.filter(item => !item.checked);
    await saveCities(updated);
    setCities(updated);
  };

  const toggleCheck = (id: number) => {
    setCities(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: true } : item,
      ),
    );
  };

  return { cities, addCity, deleteCity, deleteSelected, toggleCheck };
};
