import { SessionProvider } from '@/src/ctx';
import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';

const queryClient = new QueryClient();

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <Provider store={store}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
}
