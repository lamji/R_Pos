import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme';

export const styles = StyleSheet.create({
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
    // marginBottom: 20,
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
    marginBottom: 10,
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
  },
  text: {
    textAlign: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonOk: {
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    padding: 10,
    width: '30%',
    alignSelf: 'center',
    borderRadius: 20,
    color: theme.colors.background,
  },
});
