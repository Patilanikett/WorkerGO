import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="employer-signup" options={{ title: 'Employer Signup' }} />
      <Stack.Screen name="worker-signup" options={{ title: 'Worker Signup' }} />
    </Stack>
  );
}

export default AuthLayout;
