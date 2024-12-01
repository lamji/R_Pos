import { theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingHorizontal: 40,
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  header: {
    fontSize: theme.fontSizes.h5,
    textAlign: 'left',
  },
  listContent: {
    // padding: 16, // Add padding to the list
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  description: {
    fontSize: 14,
    color: theme.colors.sub,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: theme.colors.sub,
    marginBottom: 8,
  },
  id: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default styles;
