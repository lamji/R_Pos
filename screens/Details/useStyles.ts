import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.default,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: theme.colors.default,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
});

export default styles;
