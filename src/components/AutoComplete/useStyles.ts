import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    // marginTop: 10,
  },
  input: {
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 16,
    width: '90%',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notFound: {
    padding: 10,
    color: theme.colors.default,
    textAlign: 'center',
  },
  flatList: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    // marginTop: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  Scanner: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  emptyList: {
    padding: 10,
    alignItems: 'center',
  },
});
