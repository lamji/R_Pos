import { theme } from '../theme';

export const getHeaderOptions = (title: string) => ({
  headerShown: true,
  title: title,
  headerBackTitle: 'Back',
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: theme.colors.background,
  headerTitleStyle: {
    fontWeight: 'bold' as 'bold',
  },
});
