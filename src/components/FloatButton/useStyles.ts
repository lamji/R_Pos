import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom of the screen
    left: 10, // Start from the left
    right: 10, // Extend to the right
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
});

export default styles;
