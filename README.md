# 🌦️ RN Forecast — React Native Weather App

A beautifully designed, cross-platform weather application built with **React Native CLI** and **TypeScript**. Search any city worldwide to get real-time weather conditions, save your favorite cities, and enjoy a polished UI with gradient backgrounds that adapt to current weather conditions.

---

## ✨ Features

- **Live Weather Data** — Fetches real-time weather from the [OpenWeatherMap API](https://openweathermap.org/api) including temperature, humidity, pressure, wind speed, visibility, and sunrise/sunset times.
- **City Search** — Search any city by name and instantly view detailed weather information.
- **Favorite Cities** — Save cities to a persistent favorites list powered by AsyncStorage; quickly revisit them with a single tap.
- **Multi-Select & Bulk Delete** — Long-press to enter selection mode and delete multiple favorites at once.
- **Dynamic Weather Gradients** — The weather detail screen's background gradient changes based on current conditions (sunny, rainy, cloudy, thunderstorm, snow, etc.).
- **Adaptive Weather Icons** — Condition-specific icons from MaterialCommunityIcons for an intuitive visual experience.
- **Skeleton Loading** — Animated skeleton placeholders provide smooth feedback while data loads.
- **Fade-In Animations** — Weather content gracefully fades and slides into view.
- **Centralized Design System** — A single theme file governs all colors, typography, spacing, shadows, and radii for consistency across the app.
- **Type-Safe Navigation** — Fully typed React Navigation stack with TypeScript generics.

---

## 🏗️ Tech Stack

| Layer            | Technology                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| **Framework**    | React Native 0.85.3 (CLI — no Expo)                                       |
| **Language**     | TypeScript 5.x                                                             |
| **Navigation**   | React Navigation 7 (Native Stack)                                          |
| **State**        | React Hooks (`useState`, `useEffect`, custom hooks)                        |
| **Storage**      | `@react-native-async-storage/async-storage` (persistent favorites)         |
| **HTTP**         | Native `fetch` API                                                         |
| **Icons**        | `react-native-vector-icons` (MaterialCommunityIcons)                       |
| **UI**           | `react-native-linear-gradient`, `react-native-safe-area-context`           |
| **Config**       | `react-native-config` (`.env` file for API keys)                           |
| **Testing**      | Jest + React Test Renderer                                                 |
| **Linting**      | ESLint + Prettier                                                          |

---

## 📁 Project Structure

```
RNForecastApp/
├── App.tsx                         # Root component — navigation setup
├── index.js                        # Entry point
├── app.json                        # App metadata
├── .env                            # Environment variables (API key — not committed)
├── package.json
├── tsconfig.json
│
├── src/
│   ├── api/
│   │   └── weatherApi.ts           # OpenWeatherMap API service
│   │
│   ├── components/
│   │   ├── CityListItem.tsx        # Favorite city row (checkbox, name, delete, chevron)
│   │   ├── SearchBar.tsx           # Search input with Search & Add-to-Favorites buttons
│   │   ├── SkeletonLoader.tsx      # Animated skeleton loading placeholder
│   │   └── WeatherDetailCard.tsx   # Glassmorphic detail card (humidity, pressure, etc.)
│   │
│   ├── constants/
│   │   └── config.ts               # API base URL, API key, storage keys
│   │
│   ├── hooks/
│   │   ├── useCities.ts            # Custom hook — CRUD for favorite cities list
│   │   └── useWeather.ts           # Custom hook — fetch weather with loading/error state
│   │
│   ├── models/
│   │   ├── city.ts                 # City interface (id, name, checked)
│   │   └── weather.ts              # WeatherData interface (OpenWeatherMap response shape)
│   │
│   ├── navigation/
│   │   ├── AppNavigator.ts         # Stack navigator instance
│   │   └── types.ts                # RootStackParamList, screen prop types
│   │
│   ├── screens/
│   │   ├── home_page.tsx           # Home — search bar, favorites list, empty state
│   │   └── weather_info.tsx        # Weather detail — hero section, detail grid, sunrise/sunset
│   │
│   ├── storage/
│   │   └── cityStorage.ts          # AsyncStorage wrapper (getCities / saveCities)
│   │
│   ├── theme/
│   │   └── index.ts                # Design system — Colors, Typography, Spacing, Shadows,
│   │                               #   Radii, WeatherIcons, WeatherGradients, utilities
│   │
│   └── types/
│       └── declarations.d.ts       # Module declarations for non-TS dependencies
│
├── android/                        # Android native project
├── ios/                            # iOS native project
└── __tests__/                      # Unit tests
```

---

## 📱 Screens

### Home Screen
- Gradient header with app title and weather icon
- Search bar with **Search** (navigate to weather) and **Favorites** (save city) actions
- FlatList of saved cities with swipe-to-delete and long-press multi-select
- Elegant empty state with instructional text

### Weather Info Screen
- Full-screen gradient background that adapts to weather conditions
- Hero section: large weather icon, temperature in °C, description, city & country
- "Feels like" pill badge with high/low temperatures
- 2×2 glassmorphic detail cards: Humidity, Pressure, Wind Speed, Visibility
- Sunrise/Sunset display with formatted times
- Graceful error state with a "Go Back & Try Again" button
- Heart button in top bar to add city to favorites

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22.11.0
- **Ruby** (for iOS CocoaPods)
- **Xcode** (iOS) / **Android Studio** (Android)
- **React Native CLI** environment set up — follow the [official guide](https://reactnative.dev/docs/set-up-your-environment)

### 1. Clone the Repository

```bash
git clone https://github.com/parag333/RNForecastApp.git
cd RNForecastApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root:

```env
WEATHER_API_KEY=your_openweathermap_api_key_here
```

> Get a free API key at [https://openweathermap.org/api](https://openweathermap.org/api)

### 4. iOS Setup (macOS only)

```bash
cd ios && pod install && cd ..
```

### 5. Run the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 🔑 Environment Variables

| Variable           | Description                            | Required |
| ------------------ | -------------------------------------- | -------- |
| `WEATHER_API_KEY`  | OpenWeatherMap API key                 | ✅       |

The app uses [`react-native-config`](https://github.com/luggit/react-native-config) to load environment variables from the `.env` file at build time.

> **⚠️ Important:** Never commit your `.env` file. It is listed in `.gitignore` to prevent accidental exposure of API keys.

---

## 🎨 Design System

The entire visual language is defined in [`src/theme/index.ts`](src/theme/index.ts):

- **Colors** — Primary gradients (indigo → teal), surfaces, text hierarchy, semantic colors, glassmorphism tokens
- **Typography** — 8 preset scales from `hero` (52px) to `small` (11px)
- **Spacing** — 6-step scale: `xs`(4) → `xxl`(48)
- **Radii** — From `sm`(8) to `round`(999)
- **Shadows** — Three elevation levels: `small`, `medium`, `large`
- **Weather Mappings** — Condition-to-gradient and condition-to-icon lookup tables for 13+ weather types

---

## 🧪 Running Tests

```bash
npm test
```

---

## 🛠️ Available Scripts

| Script            | Command                        | Description                  |
| ----------------- | ------------------------------ | ---------------------------- |
| `npm start`       | `react-native start`           | Start Metro bundler          |
| `npm run android` | `react-native run-android`     | Build & run on Android       |
| `npm run ios`     | `react-native run-ios`         | Build & run on iOS           |
| `npm test`        | `jest`                         | Run unit tests               |
| `npm run lint`    | `eslint .`                     | Lint the codebase            |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the free weather API
- [React Native](https://reactnative.dev/) community
- [MaterialCommunityIcons](https://materialdesignicons.com/) for the icon set
