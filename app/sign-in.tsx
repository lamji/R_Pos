import LoginScreen from '@/screens/Login';
import { useSession } from '@/src/ctx';
import { router } from 'expo-router';

export default function SignIn() {
  const { signIn } = useSession();

  return (
    <LoginScreen
      handleSignIn={function ({ email, password }: any): void {
        signIn({ email, password });
        router.replace('/');
      }}
    />
  );
}
