import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '@/src/theme';

const HeaderMenu = ({ color = theme.colors.primary, onPress }: any) => {
  return (
    <View style={styles.container}>
      <Ionicons name="person" size={24} color={color} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10, // Adjust padding as needed
    borderWidth: 1,
    padding: 5,
    borderRadius: 50,
    borderColor: 'white',
    marginTop: 5,
    backgroundColor: theme.colors.background,
  },
});

export default HeaderMenu;
