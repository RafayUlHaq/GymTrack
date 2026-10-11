import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getColors, useTheme } from '../context/ThemeContext';

export function AboutScreen() {
  const { isDark } = useTheme();
  const C = getColors(isDark);

  const features = [
    { icon: '💪', label: 'Browse muscle group workouts' },
    { icon: '📝', label: 'Log sets, reps and weight' },
    { icon: '📊', label: 'Track your progress over time' },
    { icon: '⚙️', label: 'Customize your preferences' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.bg }]} edges={['bottom']}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🏋️</Text>
        <Text style={styles.heroTitle}>TrackGym</Text>
        <Text style={styles.heroVersion}>Version 1.0.0</Text>
        <Text style={styles.heroDesc}>
          A simple workout tracker to help you stay consistent, log your
          lifts, and watch your strength grow over time.
        </Text>
      </View>

      <Text style={[styles.sectionLabel, { color: C.sectionLabel }]}>What you can do</Text>

      <View style={[styles.featureList, { backgroundColor: C.card }]}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <Text style={[styles.featureLabel, { color: C.text }]}>{f.label}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.footer, { color: C.subText }]}>
        Built with React Native &amp; Expo · SMD Assignment 2
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 36,
  },
  heroEmoji: { fontSize: 56, marginBottom: 10 },
  heroTitle: { fontSize: 30, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  heroVersion: { fontSize: 13, color: '#888', marginTop: 4, marginBottom: 14 },
  heroDesc: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 10,
  },
  featureList: {
    borderRadius: 14,
    marginHorizontal: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 14,
  },
  featureIcon: { fontSize: 22 },
  featureLabel: { fontSize: 15, fontWeight: '500' },
  footer: { textAlign: 'center', fontSize: 12, marginTop: 32 },
});
