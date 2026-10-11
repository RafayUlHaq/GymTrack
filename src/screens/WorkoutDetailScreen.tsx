import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList, Exercise } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutDetail'>;

export function WorkoutDetailScreen({ route, navigation }: Props) {
  // Requirement: display received route params
  const { category } = route.params;

  const renderExercise = ({ item, index }: { item: Exercise; index: number }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() =>
        navigation.navigate('LogWorkout', {
          exercise: item,
          categoryName: category.name,
        })
      }
      activeOpacity={0.75}
    >
      <View style={[styles.indexBadge, { backgroundColor: category.color }]}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseMeta}>
          {item.sets} sets · {item.reps} reps
        </Text>
        <Text style={styles.exerciseDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <Text style={[styles.arrow, { color: category.color }]}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Banner showing received route param data */}
      <View style={[styles.banner, { backgroundColor: category.color }]}>
        <Text style={styles.bannerEmoji}>{category.emoji}</Text>
        <View>
          <Text style={styles.bannerTitle}>{category.name} Day</Text>
          <Text style={styles.bannerSub}>
            {category.exercises.length} exercises · Tap to log
          </Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Exercises</Text>

      <FlatList
        data={category.exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExercise}
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 14,
  },
  bannerEmoji: {
    fontSize: 44,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  bannerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 13,
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
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  indexBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  indexText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  exerciseMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  exerciseDesc: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
    lineHeight: 16,
  },
  arrow: {
    fontSize: 26,
    fontWeight: '300',
    marginLeft: 8,
  },
});
