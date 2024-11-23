import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    // marginBottom: 20,
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center', // Center content inside the card
  },
  icon: {
    // marginBottom: 10, // Add some space between the icon and title
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 5,
    fontSize: theme.fontSizes.caption,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
