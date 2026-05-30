import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Radii, Shadows, Spacing, Typography } from '../theme';
import { CitySearchResult } from '../models/searchResults';

interface CitySearchDropdownProps {
  results: CitySearchResult[];
  isLoading: boolean;
  visible: boolean;
  onSelectCity: (city: CitySearchResult) => void;
}

const CitySearchDropDown: React.FC<CitySearchDropdownProps> = ({
  results,
  isLoading,
  visible,
  onSelectCity,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {isLoading && results.length === 0 ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size={'small'} color={Colors.accent} />
          <Text style={styles.loadingText}>Searching cities...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          scrollEnabled={false}
          keyboardShouldPersistTaps={'handled'}
          keyExtractor={item => `${item.lat}-${item.long}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelectCity(item)}
              activeOpacity={0.7}
              style={styles.row}
            >
              <Icon name="map-marker" size={20} color={Colors.accent} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.cityName}>{item.name}</Text>
                <Text style={styles.subtitle}>
                  {[item.state, item.country].filter(Boolean).join(', ')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  cityName: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
  },

  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.divider,
    marginHorizontal: Spacing.md,
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
  },

  loadingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});

export default CitySearchDropDown;
