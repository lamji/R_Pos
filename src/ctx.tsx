import { useContext, createContext, type PropsWithChildren, useState } from 'react';
import { useStorageState } from './useStorageState';
import ModalAlert from './components/Modal';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/screens/Login/useStyles';
import useApi from './hooks/useLogin';

interface LoginProps {
  email: string;
  password: string;
}

const AuthContext = createContext<{
  signIn: (props: LoginProps) => void;
  signOut: () => void;
  showLoader?: (t: boolean) => void;
  isSuccess?: (t: boolean) => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  showLoader: () => null,
  isSuccess: () => null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const { request } = useApi();
  const [[isLoading, session], setSession] = useStorageState('session');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [alertType, setAlrtType] = useState<string>('');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (values: LoginProps) => {
          try {
            const result = await request.post('/login', {
              body: { email: values.email, code: values.password },
            });

            if (result.success) {
              setSession(result.token);
            } else {
              setAlertOpen(true);
              setAlrtType('failed');
              setMessages(result.message);
            }
          } catch (err) {
            console.error('Login failed:', err);
            setAlrtType('failed');
            setAlertOpen(true);
            setMessages(err);
          }
        },
        signOut: () => {
          setSession(null);
        },
        isSuccess: (t: boolean) => {
          if (t) {
            setAlertOpen(true);
            setAlrtType('success');
            setMessages('Success');
          } else {
            setAlertOpen(true);
            setAlrtType('failed');
            setMessages('Failed');
          }
        },
        showLoader: (t: boolean) => {
          setLoading(t);
        },
        session,
        isLoading,
      }}
    >
      {children}

      <ModalAlert hideButton={true} visible={alertOpen} onClose={() => null}>
        <View>
          <View style={styles.iconWrapper}>
            <Ionicons
              name={alertType === 'failed' ? 'alert' : 'checkmark-circle-outline'}
              size={44}
              color={alertType === 'failed' ? 'red' : 'green'}
            />
          </View>
          <Text style={styles.text}>{messages}</Text>
          <TouchableOpacity onPress={() => setAlertOpen(false)}>
            <Text style={styles.buttonOk}>OK</Text>
          </TouchableOpacity>
        </View>
      </ModalAlert>
    </AuthContext.Provider>
  );
}
