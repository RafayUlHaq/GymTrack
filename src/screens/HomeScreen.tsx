import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getColors, useTheme } from '../context/ThemeContext';
import { WORKOUT_CATEGORIES } from '../data/workouts';
import { WorkoutCategory } from '../types';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const C = getColors(isDark);

  const renderItem = ({ item }: { item: WorkoutCategory }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: C.card, borderLeftColor: item.color }]}
      onPress={() => navigation.navigate('WorkoutDetail', { category: item })}
      activeOpacity={0.75}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.cardText}>
        <Text style={[styles.cardTitle, { color: C.text }]}>{item.name}</Text>
        <Text style={[styles.cardSub, { color: C.subText }]}>
          {item.exercises.length} exercises
        </Text>
      </View>
      <Text style={[styles.arrow, { color: item.color }]}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.bg }]} edges={['bottom']}>
      <Text style={[styles.heading, { color: C.sectionLabel }]}>Choose a Muscle Group</Text>
      <FlatList
        data={WORKOUT_CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 18,
    marginVertical: 6,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji: { fontSize: 32, marginRight: 14 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardSub: { fontSize: 13, marginTop: 2 },
  arrow: { fontSize: 28, fontWeight: '300' },
});
