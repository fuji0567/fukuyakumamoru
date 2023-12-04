import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from "react-native-safe-area-context"
import * as Notifications from 'expo-notifications'

import { useLoadedAssets } from "./hooks/useLoadedAssets"
import Navigation from "./navigation"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useLoadedAssets();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

