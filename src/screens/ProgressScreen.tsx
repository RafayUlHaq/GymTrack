import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogs } from '../context/LogContext';
import { LogEntry } from '../types';

export function ProgressScreen() {
  const { logs } = useLogs();

  const renderItem = ({ item }: { item: LogEntry }) => (
    <View style={styles.logCard}>
      <View style={styles.logLeft}>
        <Text style={styles.logExercise}>{item.exerciseName}</Text>
        <Text style={styles.logCategory}>{item.categoryName}</Text>
        <Text style={styles.logDate}>{item.date}</Text>
      </View>
      <View style={styles.logRight}>
        <Text style={styles.logWeight}>
          {item.weight} {item.unit}
        </Text>
        <Text style={styles.logMeta}>
          {item.sets} sets · {item.reps} reps
        </Text>
      </View>
    </View>
  );

  if (logs.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text style={styles.emptyTitle}>No workouts logged yet</Text>
          <Text style={styles.emptySub}>
            Head to the Workouts tab, pick a muscle group, and log your first
            set!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.heading}>
        {logs.length} session{logs.length !== 1 ? 's' : ''} logged
      </Text>
      <FlatList
        data={logs}
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
  logCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  logLeft: {
    flex: 1,
  },
  logExercise: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  logCategory: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  logDate: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 4,
  },
  logRight: {
    alignItems: 'flex-end',
  },
  logWeight: {
    fontSize: 20,
    fontWeight: '800',
    color: '#27AE60',
  },
  logMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});
