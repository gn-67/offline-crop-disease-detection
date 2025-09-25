import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();  //prevents users from seeing a broken screen while fonts are loading

export default function RootLayout() { //describes how to set up entire app
  const [fontsLoaded] = useFonts({
    'Jersey20-Regular': require('../assets/fonts/Jersey20-Regular.ttf'), // One level up
  });

  useEffect(() => { //when fonts loaded changes to true, hide the loading screen
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) { //fonts are NOT loaded
    return null;
  }

  return ( //once fonts are loaded, set up app structure.
    //stack = container for screens, index = show insex.tsk screen, header false = dont show a title bar at top
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}