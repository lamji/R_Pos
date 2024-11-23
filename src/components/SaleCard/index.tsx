import React from 'react';
import { View, Text } from 'react-native';
import styles from './useStyles';
import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';

interface SaleCard {
  header: string;
  amount: number;
  utanAmount: number;
  cashAmount: number;
}

export default function SaleCard({ header, amount, cashAmount, utanAmount }: SaleCard) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.amount}>{formatNumberWithPeso(amount)}</Text>
      </View>
      <View style={styles.utangCash}>
        <Text style={styles.utang}>{formatNumberWithPeso(utanAmount)}</Text>
        <Text style={styles.cash}>{formatNumberWithPeso(cashAmount)}</Text>
      </View>
    </View>
  );
}
