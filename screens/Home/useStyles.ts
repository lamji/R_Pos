import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
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
  jumbotron: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 80,
  },
  helloText: {
    fontWeight: 700,
    fontSize: 24,
    color: theme.colors.background,
  },
  nameText: {
    color: theme.colors.background,
  },
  bigCard: {
    backgroundColor: theme.colors.background,
    width: '80%',
    alignSelf: 'center', // Centers the view horizontally
    padding: 20, // Optional: Add padding inside the card
    borderRadius: 10, // Optional: Rounds the corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.15, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Shadow for Android
    marginTop: -50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardsWrapper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-between', // Space items evenly
    alignItems: 'flex-start',
    width: '80%',
    flexWrap: 'wrap', // Allow items to wrap to the next line
  },
  cardsWrapper2: {
    display: 'flex',
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'flex-start', // Space items evenly
    alignItems: 'flex-start',
    width: '80%',
    flexWrap: 'wrap', // Allow items to wrap to the next line
  },
});

export default styles;
