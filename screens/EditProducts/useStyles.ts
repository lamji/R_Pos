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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: theme.colors.background,
  },
  cameraButtonWrapper: {
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
  },
  cameraWrapper2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 5,
  },
  inEditImage2: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  menuModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  menuOptions: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    padding: 15,
  },
  menuText: {
    fontSize: 18,
  },
  cameraModal: {
    justifyContent: 'center',
    margin: 0,
  },
  cameraView: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  flipButton: {
    marginBottom: 20,
  },
  flipText: {
    fontSize: 18,
    color: '#fff',
  },
  captureButton: {
    alignSelf: 'center',
  },
});

export default styles;
