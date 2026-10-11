import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WORKOUT_CATEGORIES } from '../data/workouts';
import { RootStackParamList, WorkoutCategory } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'DrawerRoot'>;

export function HomeScreen() {
  const navigation = useNavigation<NavProp>();

  const renderItem = ({ item }: { item: WorkoutCategory }) => (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: item.color }]}
      onPress={() => navigation.navigate('WorkoutDetail', { category: item })}
      activeOpacity={0.75}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSub}>{item.exercises.length} exercises</Text>
      </View>
      <Text style={[styles.arrow, { color: item.color }]}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.heading}>Choose a Muscle Group</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
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
    backgroundColor: '#fff',
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
  emoji: {
    fontSize: 32,
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cardSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  arrow: {
    fontSize: 28,
    fontWeight: '300',
  },
});
