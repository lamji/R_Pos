import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

const OutOfStocks: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true); // `boolean` type only

  useEffect(() => {
    // Listen for network status changes
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      // console.log('Connection type:', state.type); // Log connection type
      // console.log('Is connected?', state.isConnected); // Log connectivity status
      setIsConnected(state.isConnected as boolean); // Set boolean directly
    });

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe(); // Remove the event listener when the component unmounts
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <View style={styles.container}>
      {isConnected ? (
        <Text style={styles.message}>You are connected to the internet.</Text>
      ) : (
        <Text style={styles.message}>You are offline. Please check your connection.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OutOfStocks;
