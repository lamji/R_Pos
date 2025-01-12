import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    height: '100%',
  },
  text: {
    color: theme.colors.default,
    fontSize: 18,
    fontWeight: 700,
  },
  text2: {
    color: theme.colors.default,
    fontSize: 12,
    fontWeight: 700,
    marginTop: 5,
  },
  header: {
    padding: 10,
    backgroundColor: theme.colors.primary,
  },
  body: {
    padding: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 700,
  },
  date: {
    color: theme.colors.default,
    marginBottom: 5,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  datePickerIcon: {
    marginLeft: 8,
  },
});

export default styles;
