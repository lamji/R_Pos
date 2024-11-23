import LoginScreen from '@/screens/Login';
import { getHeaderOptions } from '@/src/config/stackConfig';
import { theme } from '@/src/theme';
import { Stack, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react'; // Import useEffect

export default function RootLayout() {
  const [token, setToken] = useState<string | null>('token'); // Manage token state
  const router = useRouter();

  const handleLoginSuccess = (receivedToken: string) => {
    setToken(receivedToken);
  };

  const handleActivateAccount = () => {
    // Navigate to an account activation screen if available
    // router.push('/activate-account'); // Adjust this path as needed
  };

  // Effect to handle navigation after the component mounts and token state changes
  useEffect(() => {
    if (token) {
      // Navigate to the tabs screen after login
      router.push('/(tabs)');
    }
  }, [token, router]);

  // If no token, show the login screen
  if (!token) {
    return (
      <LoginScreen onLoginSuccess={handleLoginSuccess} onActivateAccount={handleActivateAccount} />
    );
  }

  // If token exists, show the main application layout
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Use the getHeaderOptions function for screens with different titles */}
      <Stack.Screen name="details" options={getHeaderOptions('Details')} />
      <Stack.Screen name="actions" options={getHeaderOptions('Action')} />
      <Stack.Screen name="fastMoving" options={getHeaderOptions('Fast Moving')} />
      <Stack.Screen name="oos" options={getHeaderOptions('Out Of Stocks')} />
      <Stack.Screen name="pos" options={getHeaderOptions('Point Of Sale')} />
      <Stack.Screen name="products" options={getHeaderOptions('Products')} />
      <Stack.Screen name="reports" options={getHeaderOptions('Reports')} />
      <Stack.Screen name="checkout" options={getHeaderOptions('Checkout')} />
    </Stack>
  );
}
