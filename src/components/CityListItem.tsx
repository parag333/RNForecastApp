import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { City } from '../models/city';
import { Colors, Radii, Shadows, Spacing, Typography } from '../theme';

interface CityListItemProps {
  city: City;
  onPress: () => void;
  onLongPress: () => void;
  onDelete: () => void;
}

const CityListItem: React.FC<CityListItemProps> = ({
  city,
  onPress,
  onLongPress,
  onDelete,
}) => (
  <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    activeOpacity={0.7}
    style={[
      styles.card,
      city.checked && styles.cardSelected,
    ]}
  >
    {/* Checkbox / selection indicator */}
    <View style={styles.checkContainer}>
      <Icon
        name={city.checked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
        size={22}
        color={city.checked ? Colors.checkActive : Colors.checkInactive}
      />
    </View>

    {/* City info */}
    <View style={styles.infoContainer}>
      <View style={styles.nameRow}>
        <Icon name="map-marker" size={16} color={Colors.accent} />
        <Text style={styles.cityName} numberOfLines={1}>
          {city.name}
        </Text>
      </View>
      <Text style={styles.hint}>Tap to view weather</Text>
    </View>

    {/* Delete button */}
    <TouchableOpacity
      onPress={onDelete}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={styles.deleteBtn}
    >
      <Icon name="trash-can-outline" size={20} color={Colors.error} />
    </TouchableOpacity>

    {/* Chevron */}
    <Icon name="chevron-right" size={22} color={Colors.textSecondary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  cardSelected: {
    borderWidth: 1.5,
    borderColor: Colors.selectedBorder,
    backgroundColor: Colors.selectedBackground,
  },
  checkContainer: {
    marginRight: Spacing.md,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  cityName: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
  },
  hint: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
    marginLeft: 20,
  },
  deleteBtn: {
    padding: Spacing.sm,
    marginRight: Spacing.xs,
  },
});

export default CityListItem;