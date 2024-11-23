import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#25292e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: theme.colors.default,
    fontSize: theme.fontSizes.h6,
    fontWeight: 700,
  },
  inputWrapper: {
    backgroundColor: theme.colors.background,
    padding: 20,
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  noResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  noResultText: {
    fontSize: 16,
    color: '#888',
    marginRight: 5,
  },
});

export default styles;
