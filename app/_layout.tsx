import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function RootLayout() {
  const router = useRouter();
  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
  });

  useEffect(() => {
    // router.replace('/(auth)');
  }, []);

  if (!fontsLoaded) return null;

  console.log("heelo ")

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} initialRouteName='(auth)'>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(z-app)" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
