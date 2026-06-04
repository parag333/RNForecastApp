import {
  kelvinToCelsius,
  capitalizeWords,
  getWeatherIcon,
  getWeatherGradient,
  WeatherGradients,
} from '..';

describe('kelvinToCelsius', () => {
  it('converts 273.15 K to 0°C', () => {
    expect(kelvinToCelsius(273.15)).toBe(0);
  });
  it('converts 300 K to 27°C (rounds)', () => {
    expect(kelvinToCelsius(300)).toBe(27);
  });
  it('converts 0 K (absolute zero) to -273°C', () => {
    expect(kelvinToCelsius(0)).toBe(-273);
  });
});

describe('capitalizeWords', () => {
  it('capitalizes each word in a multi-word string', () => {
    expect(capitalizeWords('light rain')).toBe('Light Rain');
  });
  it('handles a single word', () => {
    expect(capitalizeWords('clear')).toBe('Clear');
  });
  it('returns empty string for empty input', () => {
    expect(capitalizeWords('')).toBe('');
  });
});

describe('getWeatherIcon', () => {
  it('returns correct icon for "Clear"', () => {
    expect(getWeatherIcon('Clear')).toBe('weather-sunny');
  });
  it('returns correct icon for "Thunderstorm"', () => {
    expect(getWeatherIcon('Thunderstorm')).toBe('weather-lightning-rainy');
  });
  it('returns fallback icon for unknown condition', () => {
    expect(getWeatherIcon('Blizzard')).toBe('weather-partly-cloudy');
  });
  it('returns fallback icon for undefined', () => {
    expect(getWeatherIcon(undefined)).toBe('weather-partly-cloudy');
  });
});

describe('getWeatherGradient', () => {
  it('returns correct gradient for "Rain"', () => {
    expect(getWeatherGradient('Rain')).toEqual(['#1E3A5F', '#3B82F6']);
  });
  it('returns default gradient for unknown condition', () => {
    expect(getWeatherGradient('Alien')).toEqual(WeatherGradients.Default);
  });
  it('returns default gradient for undefined', () => {
    expect(getWeatherGradient(undefined)).toEqual(WeatherGradients.Default);
  });
});
