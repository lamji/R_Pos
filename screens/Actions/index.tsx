import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './useStyles';

export default function ActionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Status bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Content */}
      <Text style={styles.text}>Action Screen</Text>
    </View>
  );
}
