/**
 * Weather App — React Native CLI
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/screens/home_page';
import WeatherInfo from './src/screens/weather_info';
import { Stack } from './src/navigation/AppNavigator';
import LoginPage from './src/screens/login_page';
import RealTimeChatPage from './src/screens/real_time_chat_page';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="RealTimeChat" component={RealTimeChatPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="WeatherInfo" component={WeatherInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
