import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogProvider } from './context/LogContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navigation } from './navigation';

SplashScreen.preventAutoHideAsync();

// Inner component so it can consume ThemeContext
function ThemedApp() {
  const { isDark } = useTheme();
  const theme = isDark ? DarkTheme : DefaultTheme;

  return (
    <Navigation
      theme={theme}
      onReady={() => SplashScreen.hideAsync()}
    />
  );
}

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <LogProvider>
          <ThemedApp />
        </LogProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
