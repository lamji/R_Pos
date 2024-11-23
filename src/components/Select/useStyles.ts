import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    zIndex: 50,
  },
  inputWrapper: {
    position: 'relative', // To position the dropdown and icon correctly
    width: '100%', // Ensure full width for the wrapper
  },
  touchableInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    flexDirection: 'row', // Align the selected value and icon horizontally
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Full width for the touchable input
  },
  selectedValue: {
    fontSize: 16,
    color: theme.colors.default,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    maxHeight: 200, // Limit the height of the dropdown
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    zIndex: 1000,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.default,
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
  },
  inputError: {
    borderColor: 'red',
  },
});
