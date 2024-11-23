import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 3.84, // iOS shadow radius
    position: 'absolute', // Makes the tab bar float
    height: 60,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: '50%', // Adjust this to set the overlay width or position
    width: '70%', // Set width to 50% of the container

    backgroundColor: 'white',
    zIndex: 10,
    height: '100%',
  },
  overlayText: {
    color: 'black', // Adjust the color for better contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: background color for close button
    borderRadius: 20,
  },
  headerMenu: {
    flexDirection: 'row', // Aligns the close button and title horizontally
    justifyContent: 'space-between', // Space between the title and the close button
    alignItems: 'center', // Vertically centers them
    marginBottom: 10, // Provides space for better positioning
    padding: 20,
  },
  menuList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.list,
    marginBottom: 5,
    borderRadius: 2,
    flexDirection: 'row',
  },
  menuItemText: {
    fontSize: 16,
    color: theme.colors.default,
  },
  menuItemIcon: {
    marginRight: 10, // Space between icon and text
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default styles;
