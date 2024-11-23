import React from 'react';
import { StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionic Icons
import { useRouter } from 'expo-router';
import styles from './useStyles';

export default function DetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Status bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Content */}
      <Text style={styles.text}>Details Screen</Text>
    </View>
  );
}
