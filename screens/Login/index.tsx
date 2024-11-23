import { theme } from '@/src/theme';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo

type LoginScreenProps = {
  onLoginSuccess: (token: string) => void; // Callback to pass the token out
  onActivateAccount: () => void; // Callback for activating account
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onActivateAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password') {
      const mockToken = 'abc123'; // Mock token after successful login
      onLoginSuccess(mockToken); // Pass the token out via the callback
    } else {
      console.log('Invalid email or password');
    }
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for different platforms
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline" // Ionicon for email
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on visibility
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIconContainer}
              >
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} // Eye icon for password visibility toggle
                  size={20}
                  color="#888"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onActivateAccount}>
              <Text style={styles.activateLink}>Click to Activate Account</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    height: 50,
    flex: 1,
    paddingLeft: 40, // Adjust padding to leave space for the icon
    paddingRight: 10,
    color: 'black',
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    width: 20,
    height: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  passwordInput: {
    height: 50,
    flex: 1,
    paddingLeft: 10, // Adjust padding to leave space for the icon
    paddingRight: 40, // Adjust padding to leave space for the eye icon
    color: 'black',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  activateLink: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
