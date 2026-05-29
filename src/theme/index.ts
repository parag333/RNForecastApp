/**
 * Centralized Design System
 * All colors, typography, spacing, shadows, and radii for the app.
 */

export const Colors = {
  // Primary gradient
  gradientStart: '#1A237E', // deep indigo
  gradientEnd: '#00838F', // teal

  // Surfaces
  background: '#F4F6FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',

  // Text
  textPrimary: '#1B1F2A',
  textSecondary: '#6B7280',
  textOnGradient: '#FFFFFF',
  textOnGradientSecondary: 'rgba(255,255,255,0.7)',

  // Accent
  accent: '#00838F',
  accentLight: 'rgba(0,131,143,0.12)',

  // Semantic
  error: '#EF4444',
  errorLight: 'rgba(239,68,68,0.1)',
  success: '#22C55E',

  // Selection
  checkActive: '#00838F',
  checkInactive: '#D1D5DB',
  selectedBorder: 'rgba(0,131,143,0.3)',
  selectedBackground: 'rgba(0,131,143,0.05)',

  // Glass (for weather detail cards)
  glass: 'rgba(255,255,255,0.18)',
  glassBorder: 'rgba(255,255,255,0.3)',

  // Misc
  divider: '#E5E7EB',
  overlay: 'rgba(0,0,0,0.3)',
  white: '#FFFFFF',
  black: '#000000',
};

export const Typography = {
  hero: {
    fontSize: 52,
    fontWeight: '700' as const,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
  },
  weatherTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
  captionBold: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
  small: {
    fontSize: 11,
    fontWeight: '400' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 24,
  round: 999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
};

// ---------------------------------------------------------------------------
// Weather condition → visual mapping
// ---------------------------------------------------------------------------

/**
 * Maps OpenWeatherMap `weather[].main` values to Material icon names
 * (from react-native-vector-icons/MaterialCommunityIcons).
 */
export const WeatherIcons: Record<string, string> = {
  Clear: 'weather-sunny',
  Clouds: 'weather-cloudy',
  Rain: 'weather-pouring',
  Drizzle: 'weather-rainy',
  Thunderstorm: 'weather-lightning-rainy',
  Snow: 'weather-snowy-heavy',
  Mist: 'weather-fog',
  Fog: 'weather-fog',
  Haze: 'weather-haze',
  Smoke: 'weather-fog',
  Dust: 'weather-fog',
  Sand: 'weather-fog',
  Ash: 'weather-fog',
  Squall: 'weather-windy',
  Tornado: 'weather-tornado',
};

/**
 * Maps weather condition to a gradient color pair for the background.
 */
export const WeatherGradients: Record<string, [string, string]> = {
  Clear: ['#F97316', '#FACC15'],       // warm orange → gold
  Clouds: ['#64748B', '#94A3B8'],      // slate greys
  Rain: ['#1E3A5F', '#3B82F6'],        // deep navy → blue
  Drizzle: ['#475569', '#60A5FA'],     // cool grey → light blue
  Thunderstorm: ['#1E1B4B', '#7C3AED'], // dark indigo → violet
  Snow: ['#E0F2FE', '#BAE6FD'],        // ice white → frost blue
  Mist: ['#6B7280', '#9CA3AF'],        // grey tones
  Fog: ['#6B7280', '#9CA3AF'],
  Haze: ['#78716C', '#A8A29E'],        // warm greys
  Default: ['#1A237E', '#00838F'],     // app default indigo → teal
};

/**
 * Get the gradient pair for a weather condition string.
 */
export const getWeatherGradient = (condition?: string): [string, string] =>
  (condition && WeatherGradients[condition]) || WeatherGradients.Default;

/**
 * Get the icon name for a weather condition string.
 */
export const getWeatherIcon = (condition?: string): string =>
  (condition && WeatherIcons[condition]) || 'weather-partly-cloudy';

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/**
 * Convert Kelvin (API default) to Celsius.
 */
export const kelvinToCelsius = (kelvin: number): number =>
  Math.round(kelvin - 273.15);

/**
 * Capitalize first letter of each word.
 */
export const capitalizeWords = (str: string): string =>
  str.replace(/\b\w/g, char => char.toUpperCase());
