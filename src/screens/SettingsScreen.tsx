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

export function SettingsScreen() {
  const { logs, clearLogs } = useLogs();
  const [darkMode, setDarkMode] = React.useState(false);
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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text style={styles.sectionLabel}>Preferences</Text>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🌙</Text>
            <View>
              <Text style={styles.rowTitle}>Dark Mode</Text>
              <Text style={styles.rowSub}>Toggle dark appearance</Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#ddd', true: '#27AE60' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🔔</Text>
            <View>
              <Text style={styles.rowTitle}>Reminders</Text>
              <Text style={styles.rowSub}>Daily workout reminder</Text>
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

      <Text style={styles.sectionLabel}>Data</Text>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>📋</Text>
            <View>
              <Text style={styles.rowTitle}>Workout Logs</Text>
              <Text style={styles.rowSub}>
                {logs.length} session{logs.length !== 1 ? 's' : ''} recorded
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.row} onPress={handleClearLogs}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>🗑️</Text>
            <View>
              <Text style={[styles.rowTitle, { color: '#E74C3C' }]}>
                Clear All Logs
              </Text>
              <Text style={styles.rowSub}>Permanently remove workout history</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>About</Text>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowIcon}>📱</Text>
            <View>
              <Text style={styles.rowTitle}>TrackGym</Text>
              <Text style={styles.rowSub}>Version 1.0.0</Text>
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
    backgroundColor: '#F0F2F5',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  group: {
    backgroundColor: '#fff',
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
    color: '#1a1a1a',
  },
  rowSub: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginHorizontal: 16,
  },
});
