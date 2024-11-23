import { useState } from 'react';

interface ValidationResult {
  isValid: boolean;
  message: string;
}

export default function useInputValidation() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string>('');

  // Validate if the field is required
  const validateRequired = (value: string): ValidationResult => {
    if (!value.trim()) {
      return { isValid: false, message: 'This field is required.' };
    }
    return { isValid: true, message: '' };
  };

  // Validate if the input is a valid number
  const validateNumber = (value: string): ValidationResult => {
    if (isNaN(Number(value)) || value.trim() === '') {
      return { isValid: false, message: 'Please enter a valid number.' };
    }
    return { isValid: true, message: '' };
  };

  // General validation function that checks the type
  const validateInput = (
    value: string,
    type: 'required' | 'number' = 'required'
  ): ValidationResult => {
    if (type === 'required') {
      return validateRequired(value);
    } else if (type === 'number') {
      return validateNumber(value);
    }
    return { isValid: true, message: '' };
  };

  // Handle changes in input and validate based on type
  const handleChange = (value: string, validationType: 'required' | 'number' = 'required') => {
    setInput(value);
    const { isValid, message } = validateInput(value, validationType);

    setError(isValid ? '' : message); // Set error if input is not valid
  };

  return {
    input,
    setInput,
    error,
    handleChange,
    validateInput,
  };
}
