import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogs } from '../context/LogContext';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'LogWorkout'>;

export function LogWorkoutScreen({ route, navigation }: Props) {
  // Requirement: display received route params
  const { exercise, categoryName } = route.params;

  const { addLog } = useLogs();
  const [sets, setSets] = useState(String(exercise.sets));
  const [reps, setReps] = useState(exercise.reps);
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  const handleSave = () => {
    if (!weight.trim()) {
      Alert.alert('Missing weight', 'Please enter the weight you lifted.');
      return;
    }
    addLog({
      id: Date.now().toString(),
      exerciseName: exercise.name,
      categoryName,
      sets: Number(sets) || exercise.sets,
      reps,
      weight: weight.trim(),
      unit,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    });
    Alert.alert('Logged! 🎉', `${exercise.name} saved to your progress.`, [
      { text: 'OK', onPress: () => navigation.popToTop() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Exercise info from route params */}
          <View style={styles.infoCard}>
            <Text style={styles.infoCategory}>{categoryName}</Text>
            <Text style={styles.infoName}>{exercise.name}</Text>
            <Text style={styles.infoDesc}>{exercise.description}</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoBadge}>
                <Text style={styles.infoBadgeLabel}>Suggested Sets</Text>
                <Text style={styles.infoBadgeValue}>{exercise.sets}</Text>
              </View>
              <View style={styles.infoBadge}>
                <Text style={styles.infoBadgeLabel}>Suggested Reps</Text>
                <Text style={styles.infoBadgeValue}>{exercise.reps}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionLabel}>Log Your Performance</Text>

          <View style={styles.formCard}>
            <View style={styles.field}>
              <Text style={styles.label}>Sets</Text>
              <TextInput
                style={styles.input}
                value={sets}
                onChangeText={setSets}
                keyboardType="numeric"
                placeholder="e.g. 4"
                placeholderTextColor="#bbb"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Reps</Text>
              <TextInput
                style={styles.input}
                value={reps}
                onChangeText={setReps}
                placeholder="e.g. 8-10"
                placeholderTextColor="#bbb"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Weight</Text>
              <View style={styles.weightRow}>
                <TextInput
                  style={[styles.input, { flex: 1, marginRight: 10 }]}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                  placeholder="e.g. 60"
                  placeholderTextColor="#bbb"
                />
                <TouchableOpacity
                  style={[
                    styles.unitBtn,
                    unit === 'kg' && styles.unitBtnActive,
                  ]}
                  onPress={() => setUnit('kg')}
                >
                  <Text
                    style={[
                      styles.unitBtnText,
                      unit === 'kg' && styles.unitBtnTextActive,
                    ]}
                  >
                    kg
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.unitBtn,
                    unit === 'lbs' && styles.unitBtnActive,
                  ]}
                  onPress={() => setUnit('lbs')}
                >
                  <Text
                    style={[
                      styles.unitBtnText,
                      unit === 'lbs' && styles.unitBtnTextActive,
                    ]}
                  >
                    lbs
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Workout ✓</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  infoCategory: {
    fontSize: 12,
    color: '#aaa',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
  },
  infoDesc: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 20,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  infoBadge: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  infoBadgeLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
  },
  infoBadgeValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1a1a1a',
    backgroundColor: '#FAFAFA',
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginLeft: 6,
    backgroundColor: '#FAFAFA',
  },
  unitBtnActive: {
    backgroundColor: '#1a1a2e',
    borderColor: '#1a1a2e',
  },
  unitBtnText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  unitBtnTextActive: {
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: '#27AE60',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
