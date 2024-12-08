import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    borderRadius: 10,
    marginTop: 10,
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
    // marginLeft: 20,
  },
  totalItems: {
    fontWeight: 700,
    color: theme.colors.default,
  },
  autoCompleteWrapper: {
    backgroundColor: theme.colors.background,
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
  image: {
    width: 50, // Adjust as needed
    height: 50,
    borderRadius: 25, // Circular image
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: theme.colors.primary, // Button background color
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pText: {
    color: theme.colors.default,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});

export default styles;
