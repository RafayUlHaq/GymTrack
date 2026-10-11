import React from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogs } from '../context/LogContext';
import { getColors, useTheme } from '../context/ThemeContext';

export function SettingsScreen() {
  const { logs, clearLogs } = useLogs();
  const { isDark, toggleDark } = useTheme();
  const C = getColors(isDark);
  const [notifications, setNotifications] = React.useState(true);

  const handleClearLogs = () => {
    if (logs.length === 0) {
      Alert.alert('Nothing to clear', 'You have no logged workouts.');
      return;
    }
    Alert.alert(
      'Clear All Logs',
      `This will delete all ${logs.length} logged workout${logs.length !== 1 ? 's' : ''}. Are you sure?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearLogs();
            Alert.alert('Done', 'All workout logs have been cleared.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: C.bg }]} edges={['bottom']}>
      <Text style={[styles.sectionLabel, { color: C.sectionLabel }]}>Preferences</Text>

      <View style={[styles.group, { backgroundColor: C.card }]}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🌙</Text>
            <View>
              <Text style={[styles.rowTitle, { color: C.text }]}>Dark Mode</Text>
              <Text style={[styles.rowSub, { color: C.subText }]}>Toggle dark appearance</Text>
            </View>
          </View>
          {/* Requirement: toggle actually changes the app theme */}
          <Switch
            value={isDark}
            onValueChange={toggleDark}
            trackColor={{ false: '#ddd', true: '#27AE60' }}
            thumbColor="#fff"
          />
        </View>

        <View style={[styles.divider, { backgroundColor: C.divider }]} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🔔</Text>
            <View>
              <Text style={[styles.rowTitle, { color: C.text }]}>Reminders</Text>
              <Text style={[styles.rowSub, { color: C.subText }]}>Daily workout reminder</Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#ddd', true: '#27AE60' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <Text style={[styles.sectionLabel, { color: C.sectionLabel }]}>Data</Text>

      <View style={[styles.group, { backgroundColor: C.card }]}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>📋</Text>
            <View>
              <Text style={[styles.rowTitle, { color: C.text }]}>Workout Logs</Text>
              <Text style={[styles.rowSub, { color: C.subText }]}>
                {logs.length} session{logs.length !== 1 ? 's' : ''} recorded
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: C.divider }]} />

        <TouchableOpacity style={styles.row} onPress={handleClearLogs}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🗑️</Text>
            <View>
              <Text style={[styles.rowTitle, { color: '#E74C3C' }]}>Clear All Logs</Text>
              <Text style={[styles.rowSub, { color: C.subText }]}>
                Permanently remove workout history
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionLabel, { color: C.sectionLabel }]}>About</Text>

      <View style={[styles.group, { backgroundColor: C.card }]}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>📱</Text>
            <View>
              <Text style={[styles.rowTitle, { color: C.text }]}>TrackGym</Text>
              <Text style={[styles.rowSub, { color: C.subText }]}>Version 1.0.0</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  group: {
    borderRadius: 14,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowIcon: {
    fontSize: 22,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  rowSub: {
    fontSize: 12,
    marginTop: 1,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
});
