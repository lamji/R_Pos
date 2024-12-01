import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo
import { styles } from './useStyles';
import useViewModel from './useViewModel';

type LoginScreenProps = {
  onLoginSuccess?: (token: string) => void; // Callback to pass the token out
  onActivateAccount?: () => void; // Callback for activating account
  handleSignIn: (values: any) => void;
  isLoginError?: (args: boolean) => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onActivateAccount, handleSignIn }) => {
  const { isPasswordVisible, setIsPasswordVisible, handleLinkPress, formik } = useViewModel({
    handleSignIn,
  });

  const [storedEmail, setStoredEmail] = useState<string>(''); // State for stored email

  // Retrieve email from AsyncStorage on component mount
  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        setStoredEmail(email); // Pre-fill email input
        formik.setFieldValue('email', email); // Set formik value
      }
    })();
  }, []);

  // Save email to AsyncStorage when logging in
  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('userEmail', formik.values.email);
      formik.handleSubmit(); // Submit the form
    } catch (error) {
      console.error('Failed to save email:', error);
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
            <Text style={styles.header}>MPOS</Text>

            {/* Email Input */}
            <View
              style={[
                styles.inputContainer,
                { borderColor: formik.errors.email ? 'red' : 'unset' },
              ]}
            >
              <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                keyboardType="email-address"
                placeholderTextColor="#888"
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              {formik.errors.email && <Text style={styles.errorText}>{formik.errors.email}</Text>}
            </View>

            {/* Password Input */}
            <View
              style={[
                styles.passwordContainer,
                { borderColor: formik.errors.password ? 'red' : 'unset' },
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIconContainer}
              >
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#888"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 10 }}>
              {formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
              )}
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Other Actions */}
            <TouchableOpacity onPress={onActivateAccount}>
              <Text style={styles.activateLink}>Click to Activate Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('forgot')}>
              <Text style={styles.activateLink}>Forgot Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLinkPress}>
              <Text style={styles.activateLink}>User guide</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
