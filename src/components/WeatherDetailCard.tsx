import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Radii, Spacing, Typography } from '../theme';

interface WeatherDetailCardProps {
  icon: string;
  label: string;
  value: string;
}

const WeatherDetailCard: React.FC<WeatherDetailCardProps> = ({
  icon,
  label,
  value,
}) => (
  <View style={styles.card}>
    <View style={styles.iconRow}>
      <Icon name={icon} size={20} color={Colors.textOnGradientSecondary} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.glass,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: Spacing.md,
    margin: Spacing.xs,
    minHeight: 90,
    justifyContent: 'space-between',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  label: {
    ...Typography.caption,
    color: Colors.textOnGradientSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    ...Typography.subtitle,
    color: Colors.textOnGradient,
    marginTop: Spacing.sm,
  },
});

export default WeatherDetailCard;
