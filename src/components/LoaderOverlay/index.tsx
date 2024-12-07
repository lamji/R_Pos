import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoaderOverlay = ({ isVisible }: any) => {
  if (!isVisible) return null;

  return (
    <View style={styles.fullScreen}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});

export default LoaderOverlay;
