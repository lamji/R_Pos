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
  },
  totalItems: {
    fontWeight: 700,
    color: theme.colors.default,
  },
  autoCompleteWrapper: {
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
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
  button: {
    flexDirection: 'row', // To align icon and label horizontally
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 8, // Add space between icon and label
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '80%',
    alignSelf: 'center',
  },
  qtyHead: {
    fontSize: theme.fontSizes.h4,
    fontWeight: 700,
    marginHorizontal: 20,
  },
  buttonAdd: {
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: 10,
    borderRadius: 50,
  },
  buttonMinus: {
    backgroundColor: theme.colors.error,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: 10,
    borderRadius: 50,
  },
  Scanner: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom of the screen
    left: 0, // Start from the left
    right: 0, // Extend to the right
    alignSelf: 'center', // Center horizontally
    backgroundColor: theme.colors.primary, // Green for checkout
    flexDirection: 'row', // Arrange icon and text in a row
    alignItems: 'center', // Center icon and text vertically
    justifyContent: 'center', // Center content horizontally
    paddingVertical: 10, // Vertical padding for touchable area
    paddingHorizontal: 20, // Horizontal padding for content
    borderRadius: 30, // Rounded corners
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow transparency
    shadowRadius: 3, // Shadow blur radius
  },

  fabLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8, // Space between icon and label
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default styles;
