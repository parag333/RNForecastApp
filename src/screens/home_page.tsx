import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CitySearchBar from '../components/SearchBar';
import CitySearchDropDown from '../components/CitySearchDropDown';
import CityListItem from '../components/CityListItem';
import { useCities } from '../hooks/useCities';
import { useCitySearch } from '../hooks/useCitySearch';
import { HomeScreenProps } from '../navigation/types';
import { CitySearchResult } from '../models/searchResults';
import { Colors, Radii, Shadows, Spacing, Typography } from '../theme';
import NativeLocalStorage from '../specs/NativeLocalStorage';


const HomePage: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { cities, addCity, deleteCity, deleteSelected, toggleCheck } =
    useCities();

  const [emptySearchMessage, setEmptySearchMessage] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [isSelectMultiple, setIsSelectMultiple] = useState<boolean>(false);

  const { searchData, isLoading, errorMessage: searchError, clearResults } =
    useCitySearch(searchCity);
  
  const EMPTY = '<empty>';

  const [value, setValue] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string | null>(null);

  useEffect(() => {
    const savedValue = NativeLocalStorage?.getItem('myKey');
    console.log(`saved = ${savedValue}`);
    setValue(savedValue ?? '');
  }, []);

  function saveValue(){
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
    console.log(`edit save = ${editingValue}`);
  }

  function clearValue(){
    NativeLocalStorage?.clear();
    setValue('');
  }
  
  function deletValue(){
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }
  
  const handleOnChange = (text: string) => {
    setSearchCity(text);
    if (emptySearchMessage) {
      setEmptySearchMessage('');
    }
  };

  const handleSelectCity = (city: CitySearchResult) => {
    setSearchCity(city.name);
    clearResults();
  };

  const handleSubmit = (city: string) => {
    const trimmed = city.trim();
    if (trimmed) {
      clearResults();
      navigation.navigate('WeatherInfo', { searchCity: trimmed });
    } else {
      setEmptySearchMessage('Please enter a city name');
    }
  };

  const handleAddCity = async () => {
    const trimmed = searchCity.trim();
    if (!trimmed) {
      setEmptySearchMessage('Please enter a city name');
      return;
    }
    await addCity(trimmed);
    setSearchCity('');
    setEmptySearchMessage('');
    clearResults();
  };

  const handleDelete = async (cityId: number) => {
    await deleteCity(cityId);
    // If no cities remain checked, exit multi-select
    const remaining = cities.filter(c => c.id !== cityId);
    if (!remaining.some(c => c.checked)) {
      setIsSelectMultiple(false);
    }
  };

  const handleDeleteSelected = async () => {
    await deleteSelected();
    setIsSelectMultiple(false);
  };

  const handleLongPress = (id: number) => {
    setIsSelectMultiple(true);
    toggleCheck(id);
  };

  const hasChecked = cities.some(c => c.checked);

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View
        style={[
          styles.headerContent,
          { paddingTop: insets.top, height: 200 + insets.top },
        ]}
      >
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <Icon name="weather-partly-cloudy" size={72} color={Colors.white} />
            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle}>Weather App</Text>
              <Text style={styles.headerSubtitle}>
                Search any city for live weather
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* ── Body ── */}
      <View style={styles.body}>
        <CitySearchBar
          value={searchCity}
          onChangeText={handleOnChange}
          onSubmit={() => handleSubmit(searchCity)}
          onAddCity={handleAddCity}
          errorMessage={emptySearchMessage}
        />

        <CitySearchDropDown
          results={searchData}
          isLoading={isLoading}
          visible={isLoading || searchData.length > 0}
          onSelectCity={handleSelectCity}
        />

        {/* Multi-select toolbar */}
        {isSelectMultiple && hasChecked && (
          <View style={styles.toolbar}>
            <TouchableOpacity
              onPress={handleDeleteSelected}
              activeOpacity={0.7}
              style={styles.deleteSelectedBtn}
            >
              <Icon
                name="delete-sweep-outline"
                size={20}
                color={Colors.white}
              />
              <Text style={styles.deleteSelectedText}>Delete Selected</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsSelectMultiple(false)}
              activeOpacity={0.7}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Favorites section label */}
        {cities.length > 0 && (
          <View style={styles.sectionHeader}>
            <Icon name="heart" size={16} color={Colors.accent} />
            <Text style={styles.sectionTitle}>
              Favorite Cities ({cities.length})
            </Text>
          </View>
        )}

        {/* City list */}
        <FlatList
          data={cities}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CityListItem
              city={item}
              onDelete={() => handleDelete(item.id)}
              onLongPress={() => handleLongPress(item.id)}
              onPress={() => handleSubmit(item.name)}
            />
          )}
          contentContainerStyle={
            cities.length === 0
              ? styles.emptyContainer
              : { paddingBottom: insets.bottom + Spacing.xxl }
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Icon
                  name="city-variant-outline"
                  size={48}
                  color={Colors.textSecondary}
                />
              </View>
              <Text style={styles.emptyTitle}>No favorite cities yet</Text>
              <Text style={styles.emptySubtitle}>
                Search for a city above and tap{'\n'}"Add to Favorites" to save
                it here
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
        {/* <Text style = {styles.emptyTitle}>Current stored value is = {value ?? 'No value'}</Text>
        <TextInput placeholder='Enter a text to be saved' style = {styles.input} onChangeText={setEditingValue}/>
        <Button title="Save" onPress={saveValue} />
        <Button title="Remove" onPress={clearValue} />
        <Button title="Clear" onPress={deletValue} /> */}
      </View>
    </View>
  );
};

/* ────────────────────────────────────────────────────────────────────────────
   Styles
   ──────────────────────────────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ── Header ──
  
  headerRow: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: Radii.pill,
    borderBottomRightRadius: Radii.pill,
    justifyContent: 'center',
  },

  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTextWrap: {
    
  },
  headerTitle: {
    ...Typography.weatherTitle,
    color: Colors.textOnGradient,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textOnGradientSecondary,
    marginTop: 2,
  },

  // ── Body ──
  body: {
    flex: 1,
    marginTop: Spacing.md,
    zIndex: 10,
  },

  // ── Toolbar ──
  toolbar: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  deleteSelectedBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.error,
    borderRadius: Radii.md,
    paddingVertical: 11,
    ...Shadows.small,
  },
  deleteSelectedText: {
    ...Typography.bodyBold,
    color: Colors.white,
  },
  cancelBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 11,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.divider,
    justifyContent: 'center',
  },
  cancelBtnText: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },

  // ── Section ──
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ── Empty State ──
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  input: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default HomePage;
