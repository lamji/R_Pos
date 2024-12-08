import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pText: {
    color: theme.colors.default,
    textAlign: 'center',
    fontSize: 15,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: theme.colors.primary, // Button background color
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: theme.colors.default,
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  cameraWrapper: {
    position: 'absolute',
    bottom: -10,
    right: 90,
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 50, // Circular button
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background, // Border to match the background
  },
  nonEditImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  inEditImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular shape
    borderWidth: 2,
    borderColor: theme.colors.primary, // Optional: Add border
  },
});

export default styles;
