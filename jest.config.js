module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    'react-native-config$': '<rootdir>/jest/mocks/react-native-config.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      'react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-native-vector-icons' +
      '|react-native-linear-gradient' +
      '|react-native-safe-area-context' +
      '|react-native-screens' +
      '|@react-native-async-storage/async-storage' +
      ')/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/types/**',
    '!src/theme/index.ts',
  ],
};
