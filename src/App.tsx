import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogProvider } from './context/LogContext';
import { Navigation } from './navigation';

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    // GestureHandlerRootView is required by the Drawer navigator
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* LogProvider gives all screens access to the workout log */}
      <LogProvider>
        <Navigation
          theme={theme}
          onReady={() => SplashScreen.hideAsync()}
        />
      </LogProvider>
    </GestureHandlerRootView>
  );
}
