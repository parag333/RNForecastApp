import React from 'react';
import { render, screen } from '@testing-library/react-native';
import WeatherDetailCard from '../WeatherDetailCard';

describe('WeatherDetailCard', () => {
  it('renders the label text', () => {
    render(
      <WeatherDetailCard icon="water-percent" label="Humidity" value="80%" />,
    );

    expect(screen.getByText('Humidity')).toBeTruthy();
  });

  it('renders the value text', () => {
    render(
      <WeatherDetailCard icon="gauge" label="Pressure" value="1012 hPa" />,
    );

    expect(screen.getByText('1012 hPa')).toBeTruthy();
  });

  it('renders the icon', () => {
    render(
      <WeatherDetailCard icon="water-percent" label="Humidity" value="80%" />,
    );

    // Our mock renders the icon name as text with testID="icon-{name}"
    expect(screen.getByTestId('icon-water-percent')).toBeTruthy();
  });
});
