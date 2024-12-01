import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // // backgroundColor: '#25292e',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: theme.colors.default,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: theme.colors.default,
  },
  jumboTron: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    height: 120,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    fontWeight: 700,
    color: theme.colors.background,
    fontSize: theme.fontSizes.h3,
  },
  searchWrapper: {
    backgroundColor: theme.colors.background,

    width: '90%',
    alignSelf: 'center',
    marginTop: -30,
    borderRadius: 10,
    marginBottom: 10,
  },
  overAll: {
    color: theme.colors.background,
    fontWeight: 700,
    marginBottom: 30,
  },
  item: {
    backgroundColor: theme.colors.background,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.default,
    fontWeight: 700,
  },
  list: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 100,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes the view circular
    backgroundColor: '#007bff', // Background color for the avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Spacing between avatar and text
  },
  avatarText: {
    color: '#fff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalItems: {
    fontWeight: 700,
    color: theme.colors.default,
  },
});

export default styles;
