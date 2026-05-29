import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors, Radii, Spacing } from '../theme';

/**
 * Animated skeleton loader that mimics the weather detail screen layout.
 * Shows pulsing rounded rectangles while data is loading.
 */
const SkeletonLoader: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  const Bone = ({ width, height, style }: { width: number | string; height: number; style?: object }) => (
    <Animated.View
      style={[
        styles.bone,
        { width: width as any, height, opacity: pulseAnim },
        style,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {/* Weather icon placeholder */}
      <Bone width={80} height={80} style={styles.iconBone} />

      {/* Temperature placeholder */}
      <Bone width={140} height={52} style={styles.tempBone} />

      {/* Description placeholder */}
      <Bone width={180} height={24} style={styles.descBone} />

      {/* Location placeholder */}
      <Bone width={120} height={16} style={styles.locBone} />

      {/* Detail cards grid */}
      <View style={styles.gridRow}>
        <Bone width={'47%'} height={90} />
        <Bone width={'47%'} height={90} />
      </View>
      <View style={styles.gridRow}>
        <Bone width={'47%'} height={90} />
        <Bone width={'47%'} height={90} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
  },
  bone: {
    backgroundColor: Colors.glass,
    borderRadius: Radii.md,
  },
  iconBone: {
    borderRadius: 40,
    marginBottom: Spacing.lg,
  },
  tempBone: {
    borderRadius: Radii.sm,
    marginBottom: Spacing.md,
  },
  descBone: {
    borderRadius: Radii.sm,
    marginBottom: Spacing.sm,
  },
  locBone: {
    borderRadius: Radii.sm,
    marginBottom: Spacing.xxl,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Spacing.sm,
  },
});

export default SkeletonLoader;
