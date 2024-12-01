import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#25292e',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: 120,
  },
  amount: {
    fontWeight: 700,
    color: theme.colors.background,
    marginTop: 3,
  },
  header: {
    fontWeight: 700,
    color: theme.colors.background,
  },
  headerWrapper: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  utangCash: {
    padding: 10,
    paddingVertical: 5,
  },
  utang: {
    color: theme.colors.error,
    fontWeight: 700,
  },
  cash: {
    color: theme.colors.primary,
    fontWeight: 700,
  },
});

export default styles;
