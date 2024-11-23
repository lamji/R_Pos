import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './useStyles';

type PropsFloatButton = {
  handleCheckout: () => void;
  amount: number;
  label: string;
};

export default function FloatingIcon({ handleCheckout, amount, label }: PropsFloatButton) {
  return (
    <TouchableOpacity style={styles.fab} onPress={handleCheckout}>
      <Ionicons name="cart" size={24} color="#fff" />
      <Text style={styles.fabLabel}>
        {label}: {formatNumberWithPeso(amount)}
      </Text>
    </TouchableOpacity>
  );
}
