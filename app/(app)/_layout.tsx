import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '@/src/ctx';
import { getHeaderOptions } from '@/src/config/stackConfig';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
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
      <Stack.Screen name="edit" options={getHeaderOptions('Edit Product')} />
    </Stack>
  );
}
