import 'react-native-reanimated';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Text, TouchableOpacity } from 'react-native';

import { AboutScreen } from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LogWorkoutScreen } from '../screens/LogWorkoutScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { WorkoutDetailScreen } from '../screens/WorkoutDetailScreen';

// ─── Tab Navigator (Workouts + Progress + Settings) ──────────────────────────
const MainTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: '#27AE60',
    tabBarInactiveTintColor: '#999',
    tabBarStyle: {
      backgroundColor: '#fff',
      borderTopColor: '#eee',
      height: 60,
      paddingBottom: 8,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
  },
  screens: {
    Workouts: {
      screen: HomeScreen,
      options: {
        tabBarLabel: 'Workouts',
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>🏋️</Text>
        ),
      },
    },
    Progress: {
      screen: ProgressScreen,
      options: {
        tabBarLabel: 'Progress',
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>📊</Text>
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>⚙️</Text>
        ),
      },
    },
  },
});

// ─── Drawer Navigator (wraps Tabs + About) ───────────────────────────────────
const DrawerRoot = createDrawerNavigator({
  screenOptions: {
    headerShown: false,
    drawerActiveTintColor: '#27AE60',
    drawerInactiveTintColor: '#555',
    drawerStyle: {
      backgroundColor: '#1a1a2e',
      width: 260,
    },
    drawerLabelStyle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#fff',
    },
    drawerActiveBackgroundColor: 'rgba(39,174,96,0.15)',
  },
  screens: {
    MainTabs: {
      screen: MainTabs,
      options: {
        drawerLabel: '🏠  Home',
        title: 'TrackGym',
      },
    },
    About: {
      screen: AboutScreen,
      options: {
        drawerLabel: 'ℹ️  About',
        title: 'About',
      },
    },
  },
});

// ─── Root Stack (Drawer + detail screens) ────────────────────────────────────
// Requirement: Stack Navigator for drill-down (Home → WorkoutDetail → LogWorkout)
// Requirement: Header button on WorkoutDetail ("Start" → alert)
// Requirement: Custom header titles per screen
const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerStyle: { backgroundColor: '#1a1a2e' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: '700' },
  },
  screens: {
    // Drawer lives at the root — it provides the tab bar and drawer
    DrawerRoot: {
      screen: DrawerRoot,
      options: ({ navigation }: any) => ({
        // Custom header title for the root
        title: 'TrackGym 🏋️',
        headerRight: () => (
          // Requirement: Header button — opens the drawer
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginRight: 4, padding: 6 }}
          >
            <Text style={{ fontSize: 20 }}>☰</Text>
          </TouchableOpacity>
        ),
      }),
    },

    // Requirement: pass category via route params → WorkoutDetail
    WorkoutDetail: {
      screen: WorkoutDetailScreen,
      options: ({ route, navigation }: any) => ({
        // Requirement: custom header title from route param
        title: `${route.params.category.name} Day`,
        headerRight: () => (
          // Requirement: header button — "Start" triggers meaningful action
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                `Start ${route.params.category.name} Day 💪`,
                'Pick an exercise below to log your first set.',
                [{ text: 'Let\'s go!' }]
              )
            }
            style={{
              backgroundColor: '#27AE60',
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 8,
              marginRight: 4,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>
              Start
            </Text>
          </TouchableOpacity>
        ),
      }),
    },

    // Requirement: pass exercise via route params → LogWorkout
    LogWorkout: {
      screen: LogWorkoutScreen,
      options: ({ route }: any) => ({
        // Requirement: custom header title from route param
        title: `Log: ${route.params.exercise.name}`,
        headerRight: () => (
          // Requirement: header button — tips alert
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                '💡 Tip',
                'Focus on form before adding weight. Progressive overload is key to strength gains.'
              )
            }
            style={{ marginRight: 4, padding: 6 }}
          >
            <Text style={{ fontSize: 18, color: '#fff' }}>💡</Text>
          </TouchableOpacity>
        ),
      }),
    },
  },
});

// Requirement: declare module for static type inference
type RootStackType = typeof RootStack;
declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}

export const Navigation = createStaticNavigation(RootStack);
