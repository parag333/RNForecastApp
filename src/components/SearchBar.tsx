import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Radii, Shadows, Spacing, Typography } from '../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onAddCity: () => void;
  errorMessage?: string;
}

const CitySearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmit,
  onAddCity,
  errorMessage,
}) => (
  <View style={styles.wrapper}>
    {/* ── Search Input ── */}
    <View style={styles.inputContainer}>
      <Icon
        name="magnify"
        size={22}
        color={Colors.textSecondary}
        style={styles.inputIcon}
      />
      <TextInput
        placeholder="Search for a city..."
        placeholderTextColor={Colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        style={styles.textInput}
      />
    </View>

    {/* ── Error message ── */}
    {errorMessage ? (
      <View style={styles.errorRow}>
        <Icon name="alert-circle-outline" size={14} color={Colors.error} />
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    ) : null}

    {/* ── Action Buttons ──
        Short labels ("Search" / "Favorites") so they fit side-by-side
        on every screen width including iPhone SE (320pt). */}
    <View style={styles.buttonRow}>
      <TouchableOpacity
        onPress={onSubmit}
        activeOpacity={0.8}
        style={styles.primaryBtn}
      >
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientInner}
        >
          <Icon name="magnify" size={18} color={Colors.white} />
          <Text style={styles.primaryBtnText}>Search</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onAddCity}
        activeOpacity={0.7}
        style={styles.secondaryBtn}
      >
        <Icon name="heart-plus-outline" size={18} color={Colors.accent} />
        <Text style={styles.secondaryBtnText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  </View>
);

/* ────────────────────────────────────────────────────────────────────────────
   Styles
   ──────────────────────────────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },

  // ── Input ──
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.md,
    ...Shadows.medium,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  textInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    paddingVertical: 14,
  },

  // ── Error ──
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    marginTop: Spacing.sm,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
  },

  // ── Buttons ──
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  primaryBtn: {
    flex: 1,
    borderRadius: Radii.md,
    overflow: 'hidden',
    ...Shadows.small,
  },
  gradientInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryBtnText: {
    ...Typography.bodyBold,
    color: Colors.white,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: 14,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.accentLight,
    backgroundColor: Colors.accentLight,
  },
  secondaryBtnText: {
    ...Typography.bodyBold,
    color: Colors.accent,
  },
});

export default CitySearchBar;