import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string; // Optional label for the input
  value: any; // Current value of the input
  onChangeText: (text: string) => void; // Callback when text changes
  placeholder?: string; // Placeholder text for the input
  error?: string; // Validation error message
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input */}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        {...rest}
      />

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%', // Ensures the container takes full width of its parent
    marginVertical: 5, // Space around the input
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
  },
});
