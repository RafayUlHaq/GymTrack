# TrackGym — Project Summary

**Course:** Software Mobile Development — Assignment 2  
**Framework:** React Native with Expo SDK 57  
**Language:** TypeScript  

---

## What is this app?

TrackGym is a gym workout tracker. Users can browse muscle group categories (Chest, Back, Legs, etc.), view the exercises for each category, log their sets/reps/weight, and review their progress. It is built entirely with static in-memory data — no backend, no database.

The purpose of this project is **not** to build a production app. The purpose is to demonstrate five specific React Navigation concepts using a meaningful, real-world idea.

---

## Project Structure

```
SMD_A2/
├── index.tsx                        ← App entry point (registers root component)
├── babel.config.js                  ← Babel config (required for Reanimated)
├── package.json                     ← Dependencies
├── src/
│   ├── App.tsx                      ← Root component, wraps everything in providers
│   ├── types.ts                     ← TypeScript types for data and navigation
│   ├── data/
│   │   └── workouts.ts              ← Static workout data (6 categories, 3–4 exercises each)
│   ├── context/
│   │   ├── LogContext.tsx           ← Global state for logged workouts
│   │   └── ThemeContext.tsx         ← Global state for dark/light mode
│   ├── navigation/
│   │   └── index.tsx                ← All navigators defined here
│   └── screens/
│       ├── HomeScreen.tsx           ← List of muscle group categories
│       ├── WorkoutDetailScreen.tsx  ← Exercises for a selected category
│       ├── LogWorkoutScreen.tsx     ← Form to log sets/reps/weight
│       ├── ProgressScreen.tsx       ← List of all logged sessions
│       ├── SettingsScreen.tsx       ← Dark mode toggle, clear logs
│       └── AboutScreen.tsx          ← App info (accessible via Drawer)
```

---

## How the App Starts

```
index.tsx
  └── registerRootComponent(App)        ← Expo registers App as the root

App.tsx
  └── <GestureHandlerRootView>          ← Required by Drawer navigator
        └── <ThemeProvider>             ← Provides isDark + toggleDark to all screens
              └── <LogProvider>         ← Provides logs + addLog + clearLogs to all screens
                    └── <ThemedApp>     ← Reads isDark, picks DarkTheme or DefaultTheme
                          └── <Navigation> ← The actual navigator tree
```

Every screen is a child of this tree, so every screen can access the theme and the workout logs through React Context hooks.

---

## Navigator Structure (The Big Picture)

React Navigation lets you nest navigators inside each other. Here is the full structure used in this app:

```
RootStack  (NativeStackNavigator)
│
│   ┌─────────────────────────────────────────┐
├── │  DrawerRoot  (DrawerNavigator)           │  ← swipe from left or press ☰
│   │  ┌───────────────────────────────────┐  │
│   │  │  MainTabs  (BottomTabNavigator)   │  │  ← tabs at the bottom
│   │  │  ├── Workouts → HomeScreen        │  │
│   │  │  ├── Progress → ProgressScreen    │  │
│   │  │  └── Settings → SettingsScreen    │  │
│   │  └───────────────────────────────────┘  │
│   │  └── About → AboutScreen                │
│   └─────────────────────────────────────────┘
│
├── WorkoutDetail → WorkoutDetailScreen   ← pushed on top of everything
└── LogWorkout    → LogWorkoutScreen      ← pushed on top of WorkoutDetail
```

### Why this nesting order?

- **Stack is outermost** because `WorkoutDetail` and `LogWorkout` are detail screens that need to slide in on top of the entire app (over the tabs and the drawer). If the Stack were inside the Tabs, these detail screens would only appear inside one tab, which is wrong.
- **Drawer wraps Tabs** so the swipe-open drawer gesture works across all tabs. About is in the Drawer because it is not a frequently visited screen — it does not deserve a permanent tab.
- **Tabs are innermost** for the three main sections (Workouts, Progress, Settings) because users switch between them often. Tabs keep all three accessible at all times with one tap.

---

## Concept 1 — Stack Navigator

### What is a Stack Navigator?

A Stack Navigator works like a pile of cards. Each time you navigate to a new screen, a card is placed on top of the pile. Pressing the back button removes the top card and reveals the one beneath it. This is the standard navigation pattern for drill-down flows.

### Where it is used

The `RootStack` is a `NativeStackNavigator` defined in `src/navigation/index.tsx`. It has three screens:

| Screen name | Component | Purpose |
|---|---|---|
| `DrawerRoot` | DrawerNavigator | The home base — contains tabs and drawer |
| `WorkoutDetail` | WorkoutDetailScreen | Detail view for a selected muscle group |
| `LogWorkout` | LogWorkoutScreen | Form to log a set for a selected exercise |

### How navigation flows

```
HomeScreen
  │  user taps a category card
  ▼
WorkoutDetailScreen          ← pushed onto the stack
  │  user taps an exercise
  ▼
LogWorkoutScreen             ← pushed onto the stack
  │  user saves the log
  ▼
navigation.popToTop()        ← pops back all the way to HomeScreen
```

### Code

```tsx
// src/navigation/index.tsx
const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerStyle: { backgroundColor: '#1a1a2e' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: '700' },
  },
  screens: {
    DrawerRoot: { screen: DrawerRoot, options: { ... } },
    WorkoutDetail: { screen: WorkoutDetailScreen, options: { ... } },
    LogWorkout: { screen: LogWorkoutScreen, options: { ... } },
  },
});
```

### What is `screenOptions`?

`screenOptions` applies to every screen in the navigator. Here it sets the dark background colour, white text, and bold title for all headers — so you only write it once instead of repeating it on every screen.

---

## Concept 2 — Drawer Navigator

### What is a Drawer Navigator?

A Drawer Navigator shows a side panel (menu) that slides in from the left. It holds links to top-level destinations. The drawer can be opened by swiping from the left edge of the screen or by pressing a button.

### Where it is used

The `DrawerRoot` navigator is defined in `src/navigation/index.tsx`. It has two screens:

| Screen name | Component |
|---|---|
| `MainTabs` | The Tab navigator (wraps the 3 main tabs) |
| `About` | AboutScreen |

### Code

```tsx
// src/navigation/index.tsx
const DrawerRoot = createDrawerNavigator({
  screenOptions: {
    headerShown: false,               // hide drawer's own header — the Stack header is used instead
    drawerStyle: { backgroundColor: '#1a1a2e', width: 260 },
    drawerActiveTintColor: '#27AE60',
    drawerActiveBackgroundColor: 'rgba(39,174,96,0.15)',
  },
  screens: {
    MainTabs: { screen: MainTabs, options: { drawerLabel: '🏠  Home' } },
    About:    { screen: AboutScreen, options: { drawerLabel: 'ℹ️  About' } },
  },
});
```

### Why `headerShown: false`?

The Drawer navigator has its own header by default. But since the Drawer is a screen inside the RootStack, the Stack already provides a header. Showing both headers would result in two header bars stacked on top of each other. Setting `headerShown: false` on the Drawer (and also on the Tab) hides their headers and lets only the Stack header show.

### Opening the drawer from a button

Since the drawer's open button (☰) is placed in the Stack's header — not inside the drawer itself — we cannot use the drawer's own navigation object. Instead we dispatch a `OPEN_DRAWER` action which React Navigation routes up the navigator tree to the nearest Drawer:

```tsx
// src/navigation/index.tsx
function DrawerMenuButton() {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity onPress={() => navigation.dispatch({ type: 'OPEN_DRAWER' })}>
      <Text style={{ fontSize: 22, color: '#fff' }}>☰</Text>
    </TouchableOpacity>
  );
}
```

---

## Concept 3 — Tab Navigator

### What is a Tab Navigator?

A Tab Navigator shows a row of tabs at the bottom of the screen. Each tab switches to a different screen instantly without pushing anything onto a stack. All tab screens stay mounted (they do not unmount when you switch tabs), which makes switching fast.

### Where it is used

The `MainTabs` navigator is defined in `src/navigation/index.tsx`. It has three tabs:

| Tab label | Screen |
|---|---|
| 🏋️ Workouts | HomeScreen |
| 📊 Progress | ProgressScreen |
| ⚙️ Settings | SettingsScreen |

### Code

```tsx
// src/navigation/index.tsx
const MainTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: '#27AE60',
    tabBarInactiveTintColor: '#999',
    tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 8 },
  },
  screens: {
    Workouts: {
      screen: HomeScreen,
      options: {
        tabBarLabel: 'Workouts',
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏋️</Text>,
      },
    },
    // ... Progress, Settings
  },
});
```

---

## Concept 4 — Passing Data via Route Parameters

### What are route parameters?

When you navigate to a screen, you can attach data to the navigation call. That data is called route parameters (or route params). The destination screen can then read that data and use it to display the right content.

Think of it like a function call: navigating is calling the screen, and route params are the arguments you pass to it.

### Where it is used

#### Pass 1: HomeScreen → WorkoutDetailScreen

When the user taps a category card on HomeScreen, the entire category object is passed as a param:

```tsx
// src/screens/HomeScreen.tsx
onPress={() => navigation.navigate('WorkoutDetail', { category: item })}
//                                                   ^^^^^^^^^^^^^^^^
//                                      This is the route param being passed
```

The `item` here is a `WorkoutCategory` object containing: `id`, `name`, `emoji`, `color`, and `exercises[]`.

#### Pass 2: WorkoutDetailScreen → LogWorkoutScreen

When the user taps an exercise, the exercise object and the category name are passed:

```tsx
// src/screens/WorkoutDetailScreen.tsx
navigation.navigate('LogWorkout', {
  exercise: item,          // the Exercise object (name, sets, reps, description)
  categoryName: category.name,   // just the name string
})
```

### Type safety with TypeScript

The param types are declared in `src/types.ts` so TypeScript knows exactly what each screen receives:

```tsx
// src/types.ts
export type RootStackParamList = {
  DrawerRoot: undefined;                              // no params
  WorkoutDetail: { category: WorkoutCategory };       // receives a category
  LogWorkout: { exercise: Exercise; categoryName: string }; // receives exercise + name
};
```

---

## Concept 5 — Displaying Route Parameters

### What does this mean?

Once a screen receives route params, it must read them using the `useRoute()` hook and then render the data on screen.

### Why `useRoute()` instead of screen props?

There are two ways to read params in React Navigation:

**Option A — Props (does not work here):**
```tsx
function WorkoutDetailScreen({ route, navigation }) { ... }
```

**Option B — Hooks (what we use):**
```tsx
const route = useRoute();
const navigation = useNavigation();
```

We use hooks because our screens are nested deeply: Stack → Drawer → Tab → Screen. In the static API with deep nesting, the `route` and `navigation` props can be `undefined` when passed through multiple navigator layers. The hooks always traverse up the tree correctly and find the right values. This was an actual bug that was fixed during development.

### Where it is used

#### WorkoutDetailScreen reads and displays the `category` param

```tsx
// src/screens/WorkoutDetailScreen.tsx
const route = useRoute<RouteProp<RootStackParamList, 'WorkoutDetail'>>();
const { category } = route.params;

// The received data is displayed in:
<Text>{category.emoji}</Text>           // e.g. 💪
<Text>{category.name} Day</Text>        // e.g. "Chest Day"
<Text>{category.exercises.length} exercises</Text>  // e.g. "4 exercises"
// Each exercise card also uses category.color for the numbered badge
```

#### LogWorkoutScreen reads and displays the `exercise` param

```tsx
// src/screens/LogWorkoutScreen.tsx
const route = useRoute<RouteProp<RootStackParamList, 'LogWorkout'>>();
const { exercise, categoryName } = route.params;

// The received data is displayed in:
<Text>{categoryName}</Text>             // e.g. "Chest"
<Text>{exercise.name}</Text>            // e.g. "Bench Press"
<Text>{exercise.description}</Text>     // full description text
<Text>{exercise.sets}</Text>            // Suggested Sets badge → e.g. 4
<Text>{exercise.reps}</Text>            // Suggested Reps badge → e.g. "8-10"
// The form fields are also pre-filled with exercise.sets and exercise.reps
```

---

## Concept 6 — Custom Header Titles

### What does this mean?

Every screen that has a header can have a custom title. The title can be a fixed string or it can be generated dynamically from the route params — so the header changes based on which item the user tapped.

### Where it is used

All header customisation is done in `src/navigation/index.tsx` inside the `options` of each screen. This keeps all header config in one file.

#### Static title — root screen
```tsx
DrawerRoot: {
  options: {
    title: 'TrackGym 🏋️',   // always shows this
  }
}
```

#### Dynamic title from route params — WorkoutDetail
```tsx
WorkoutDetail: {
  options: ({ route }) => ({
    title: `${route.params.category.name} Day`,
    // Shows: "Chest Day", "Back Day", "Legs Day", etc.
    // Changes every time based on what the user tapped
  })
}
```

#### Dynamic title from route params — LogWorkout
```tsx
LogWorkout: {
  options: ({ route }) => ({
    title: `Log: ${route.params.exercise.name}`,
    // Shows: "Log: Bench Press", "Log: Deadlift", etc.
  })
}
```

#### Shared base styling applied to all stack screens
```tsx
screenOptions: {
  headerStyle: { backgroundColor: '#1a1a2e' },  // dark navy background
  headerTintColor: '#fff',                       // white back arrow + title
  headerTitleStyle: { fontWeight: '700' },       // bold title text
}
```

---

## Concept 7 — Header Buttons

### What does this mean?

A button can be placed inside the header using `headerRight` (right side) or `headerLeft` (left side). The button can do anything: navigate somewhere, show an alert, update data, etc.

### Where it is used — three header buttons

#### Button 1: ☰ Menu button on the root screen
**Action:** Opens the drawer side menu.

```tsx
// src/navigation/index.tsx
DrawerRoot: {
  options: {
    headerRight: () => <DrawerMenuButton />,
  }
}

function DrawerMenuButton() {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity onPress={() => navigation.dispatch({ type: 'OPEN_DRAWER' })}>
      <Text style={{ fontSize: 22, color: '#fff' }}>☰</Text>
    </TouchableOpacity>
  );
}
```

Why meaningful: the drawer cannot be accessed any other way from the header — this button is the primary way to reach the About screen.

#### Button 2: "Start" button on WorkoutDetail
**Action:** Shows an alert prompting the user to begin the workout session.

```tsx
// src/navigation/index.tsx
WorkoutDetail: {
  options: ({ route }) => ({
    headerRight: () => (
      <TouchableOpacity
        style={{ backgroundColor: '#27AE60', paddingHorizontal: 14, borderRadius: 8 }}
        onPress={() =>
          Alert.alert(
            `Start ${route.params.category.name} Day 💪`,
            'Pick an exercise below to log your first set.'
          )
        }
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>Start</Text>
      </TouchableOpacity>
    ),
  })
}
```

Why meaningful: it uses the `category.name` from route params in the alert — it is not a generic button. It gives the user a cue to begin the session.

#### Button 3: 💡 Tip button on LogWorkout
**Action:** Shows a training tip alert.

```tsx
// src/navigation/index.tsx
LogWorkout: {
  options: {
    headerRight: () => (
      <TouchableOpacity onPress={() =>
        Alert.alert('💡 Tip',
          'Focus on form before adding weight. Progressive overload is key.')
      }>
        <Text style={{ fontSize: 18, color: '#fff' }}>💡</Text>
      </TouchableOpacity>
    ),
  }
}
```

Why meaningful: it is shown at the exact moment the user is about to log a set — contextually the right place for a form tip.

---

## Extra Feature — Dark Mode

Dark mode was implemented using React Context (not a React Navigation feature, but it is a good React pattern to understand).

### How it works

```
ThemeContext
  ├── isDark: boolean          ← false = light mode, true = dark mode
  └── toggleDark: () => void   ← flips isDark when called
```

`ThemeProvider` wraps the whole app in `App.tsx`. Any screen can call `useTheme()` to get `isDark` and `toggleDark`.

```tsx
// src/context/ThemeContext.tsx
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(prev => !prev);
  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

`getColors(isDark)` returns a palette object. Every screen calls this and uses the returned colours as inline styles:

```tsx
// Any screen:
const { isDark } = useTheme();
const C = getColors(isDark);

<SafeAreaView style={{ backgroundColor: C.bg }}>
  <Text style={{ color: C.text }}>Hello</Text>
```

The toggle in SettingsScreen calls `toggleDark()` from context — this triggers a re-render of the entire app because `ThemeProvider` is at the root, and every screen instantly gets the new colours.

`App.tsx` also passes `DarkTheme` or `DefaultTheme` from React Navigation to the `<Navigation>` component — this automatically darkens the navigator's own UI elements (header, tab bar, drawer) without any extra work.

```tsx
// src/App.tsx
function ThemedApp() {
  const { isDark } = useTheme();
  const theme = isDark ? DarkTheme : DefaultTheme;
  return <Navigation theme={theme} />;
}
```

---

## Extra Feature — Global Log State

`LogContext` holds the list of logged workout sessions and makes it available to any screen.

```tsx
// src/context/LogContext.tsx
const [logs, setLogs] = useState<LogEntry[]>([]);

const addLog = (entry: LogEntry) => setLogs(prev => [entry, ...prev]);
const clearLogs = () => setLogs([]);
```

- **LogWorkoutScreen** calls `addLog()` when the user saves a session.
- **ProgressScreen** reads `logs` to display the history.
- **SettingsScreen** reads `logs.length` to show the count and calls `clearLogs()` on the destructive button.

---

## Key Dependencies

| Package | Purpose |
|---|---|
| `expo` ~57 | Build toolchain and SDK |
| `react-native` 0.86 | Core framework |
| `@react-navigation/native` | Core navigation library |
| `@react-navigation/native-stack` | Stack navigator (NativeStackNavigator) |
| `@react-navigation/bottom-tabs` | Bottom Tab navigator |
| `@react-navigation/drawer` | Drawer navigator |
| `react-native-screens` | Native screen containers (performance) |
| `react-native-safe-area-context` | Handles notches and home bars |
| `react-native-gesture-handler` | Required by Drawer for swipe gestures |
| `react-native-reanimated` v4 | Required by Drawer for animations |

---

## Summary Table — All 5 Requirements

| Requirement | Where in code | Key file |
|---|---|---|
| Pass data screen-to-screen | `navigation.navigate('WorkoutDetail', { category })` | HomeScreen.tsx |
| Display received params | `useRoute().params.category` rendered in banner + cards | WorkoutDetailScreen.tsx |
| Custom header titles | `options: ({ route }) => ({ title: \`${route.params.category.name} Day\` })` | navigation/index.tsx |
| Header button | `headerRight: () => <DrawerMenuButton />` and Start/Tip buttons | navigation/index.tsx |
| Three navigators | `createNativeStackNavigator` + `createDrawerNavigator` + `createBottomTabNavigator` | navigation/index.tsx |
