import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
import { getColors, useTheme } from '../context/ThemeContext';
import { Exercise, RootStackParamList } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'WorkoutDetail'>;
type RoutePropType = RouteProp<RootStackParamList, 'WorkoutDetail'>;

export function WorkoutDetailScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RoutePropType>();
  const { category } = route.params;
  const { isDark } = useTheme();
  const C = getColors(isDark);

  const renderExercise = ({ item, index }: { item: Exercise; index: number }) => (
    <TouchableOpacity
      style={[styles.exerciseCard, { backgroundColor: C.card }]}
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
        <Text style={[styles.exerciseName, { color: C.text }]}>{item.name}</Text>
        <Text style={[styles.exerciseMeta, { color: C.subText }]}>
          {item.sets} sets · {item.reps} reps
        </Text>
        <Text style={[styles.exerciseDesc, { color: C.subText }]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <Text style={[styles.arrow, { color: category.color }]}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.bg }]} edges={['bottom']}>
      {/* Banner always uses the category colour — looks good in both modes */}
      <View style={[styles.banner, { backgroundColor: category.color }]}>
        <Text style={styles.bannerEmoji}>{category.emoji}</Text>
        <View>
          <Text style={styles.bannerTitle}>{category.name} Day</Text>
          <Text style={styles.bannerSub}>
            {category.exercises.length} exercises · Tap to log
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionLabel, { color: C.sectionLabel }]}>Exercises</Text>

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
  container: { flex: 1 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 14,
  },
  bannerEmoji: { fontSize: 44 },
  bannerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  indexText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: '700' },
  exerciseMeta: { fontSize: 12, marginTop: 2 },
  exerciseDesc: { fontSize: 12, marginTop: 4, lineHeight: 16 },
  arrow: { fontSize: 26, fontWeight: '300', marginLeft: 8 },
});
