import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BarcodeProps {
  value: string; // The string to encode in the barcode
  width?: number; // Width of each bar
  height?: number; // Height of the barcode
}

const Barcode: React.FC<BarcodeProps> = ({ value, width = 2, height = 100 }) => {
  // Convert the string into binary-like representation
  const encodeToBinary = (data: string): string => {
    // Basic encoding: Map each character to its ASCII binary representation (8 bits)
    return data
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');
  };

  // Generate the barcode pattern
  const binaryPattern = encodeToBinary(value);

  return (
    <View style={styles.container}>
      <View style={[styles.barcode, { height }]}>
        {binaryPattern.split('').map((bit, index) => (
          <View
            key={index}
            style={{
              width,
              backgroundColor: bit === '1' ? '#000' : '#fff',
            }}
          />
        ))}
      </View>
      <Text style={styles.label}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  barcode: {
    flexDirection: 'row',
  },
});

export default Barcode;
