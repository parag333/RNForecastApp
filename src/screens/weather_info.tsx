import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WeatherInfoScreenProps } from '../navigation/types';
import { useWeather } from '../hooks/useWeather';
import WeatherDetailCard from '../components/WeatherDetailCard';
import SkeletonLoader from '../components/SkeletonLoader';
import {
  Colors,
  Radii,
  Spacing,
  Typography,
  capitalizeWords,
  getWeatherGradient,
  getWeatherIcon,
  kelvinToCelsius,
} from '../theme';
import { useCities } from '../hooks/useCities';

const WeatherInfo: React.FC<WeatherInfoScreenProps> = ({
  route,
  navigation,
}) => {
  const { searchCity } = route.params;
  const { weatherData, isLoading, errorMessage } = useWeather(searchCity);

  // Fade-in animation for content
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (weatherData && !isLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [weatherData, isLoading, fadeAnim, slideAnim]);

  const condition = weatherData?.weather?.[0]?.main;
  const gradientColors = getWeatherGradient(condition);
  const iconName = getWeatherIcon(condition);
  const { addCity} = useCities();

  const handleAddCity = async () => {
    const trimmed = searchCity.trim();
    await addCity(trimmed);
  };

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.safeArea}>
        {/* Top bar with back button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={styles.backBtn}
          >
            <Icon name="arrow-left" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Weather Details</Text>
          <TouchableOpacity
            onPress={() => handleAddCity()}
            activeOpacity={0.7}
            style={styles.backBtn}
          >
            <Icon name="heart-plus-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Loading state */}
        {isLoading && <SkeletonLoader />}

        {/* Error state */}
        {!isLoading && !weatherData && (
          <View style={styles.errorContainer}>
            <View style={styles.errorIconWrap}>
              <Icon
                name="weather-cloudy-alert"
                size={56}
                color={Colors.textOnGradientSecondary}
              />
            </View>
            <Text style={styles.errorTitle}>Oops!</Text>
            <Text style={styles.errorSubtitle}>
              {errorMessage || 'No weather data found for this city.'}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              style={styles.retryBtn}
            >
              <Icon name="arrow-left" size={18} color={Colors.white} />
              <Text style={styles.retryBtnText}>Go Back & Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Weather content */}
        {!isLoading && weatherData && (
          <Animated.View
            style={[
              styles.contentWrapper,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Hero section */}
              <View style={styles.heroSection}>
                <Icon name={iconName} size={80} color={Colors.white} />
                <Text style={styles.heroTemp}>
                  {kelvinToCelsius(weatherData.main.temp)}°C
                </Text>
                <Text style={styles.heroDescription}>
                  {capitalizeWords(weatherData.weather[0]?.description ?? '')}
                </Text>
                <View style={styles.locationRow}>
                  <Icon
                    name="map-marker"
                    size={16}
                    color={Colors.textOnGradientSecondary}
                  />
                  <Text style={styles.locationText}>
                    {weatherData.name}
                    {weatherData.sys?.country
                      ? `, ${weatherData.sys.country}`
                      : ''}
                  </Text>
                </View>
              </View>

              {/* Feels like badge */}
              <View style={styles.feelsLikeBadge}>
                <Icon
                  name="thermometer"
                  size={16}
                  color={Colors.textOnGradientSecondary}
                />
                <Text style={styles.feelsLikeText}>
                  Feels like {kelvinToCelsius(weatherData.main.feels_like)}°C
                  {'  ·  '}
                  H: {kelvinToCelsius(weatherData.main.temp_max)}°{'  '}
                  L: {kelvinToCelsius(weatherData.main.temp_min)}°
                </Text>
              </View>

              {/* Detail cards — 2×2 grid */}
              <View style={styles.gridRow}>
                <WeatherDetailCard
                  icon="water-percent"
                  label="Humidity"
                  value={`${weatherData.main.humidity}%`}
                />
                <WeatherDetailCard
                  icon="gauge"
                  label="Pressure"
                  value={`${weatherData.main.pressure} hPa`}
                />
              </View>
              <View style={styles.gridRow}>
                <WeatherDetailCard
                  icon="weather-windy"
                  label="Wind Speed"
                  value={`${weatherData.wind?.speed ?? 0} m/s`}
                />
                <WeatherDetailCard
                  icon="eye-outline"
                  label="Visibility"
                  value={`${((weatherData.visibility ?? 0) / 1000).toFixed(
                    1,
                  )} km`}
                />
              </View>

              {/* Sunrise / Sunset */}
              {weatherData.sys?.sunrise && weatherData.sys?.sunset && (
                <View style={styles.sunRow}>
                  <View style={styles.sunItem}>
                    <Icon
                      name="weather-sunset-up"
                      size={28}
                      color={Colors.textOnGradientSecondary}
                    />
                    <Text style={styles.sunLabel}>Sunrise</Text>
                    <Text style={styles.sunValue}>
                      {new Date(
                        weatherData.sys.sunrise * 1000,
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                  <View style={styles.sunDivider} />
                  <View style={styles.sunItem}>
                    <Icon
                      name="weather-sunset-down"
                      size={28}
                      color={Colors.textOnGradientSecondary}
                    />
                    <Text style={styles.sunLabel}>Sunset</Text>
                    <Text style={styles.sunValue}>
                      {new Date(
                        weatherData.sys.sunset * 1000,
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>
          </Animated.View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  // ---- Top bar ----
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    ...Typography.bodyBold,
    color: Colors.textOnGradient,
  },
  // ---- Content ----
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  // ---- Hero ----
  heroSection: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  heroTemp: {
    ...Typography.hero,
    color: Colors.textOnGradient,
    marginTop: Spacing.sm,
  },
  heroDescription: {
    ...Typography.subtitle,
    color: Colors.textOnGradientSecondary,
    marginTop: Spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  locationText: {
    ...Typography.body,
    color: Colors.textOnGradientSecondary,
  },
  // ---- Feels like ----
  feelsLikeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.glass,
    borderRadius: Radii.pill,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  feelsLikeText: {
    ...Typography.caption,
    color: Colors.textOnGradientSecondary,
  },
  // ---- Grid ----
  gridRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  // ---- Sun row ----
  sunRow: {
    flexDirection: 'row',
    backgroundColor: Colors.glass,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sunItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sunLabel: {
    ...Typography.caption,
    color: Colors.textOnGradientSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sunValue: {
    ...Typography.bodyBold,
    color: Colors.textOnGradient,
  },
  sunDivider: {
    width: 1,
    height: 50,
    backgroundColor: Colors.glassBorder,
  },
  // ---- Error ----
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  errorIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.glass,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  errorTitle: {
    ...Typography.title,
    color: Colors.textOnGradient,
    marginBottom: Spacing.sm,
  },
  errorSubtitle: {
    ...Typography.body,
    color: Colors.textOnGradientSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radii.pill,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  retryBtnText: {
    ...Typography.bodyBold,
    color: Colors.white,
  },
});

export default WeatherInfo;
