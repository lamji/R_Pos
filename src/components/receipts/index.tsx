import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import moment from 'moment';
import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';
import { theme } from '@/src/theme';

export interface ReceiptProps {
  type: 'utang' | 'cash' | 'partial';
  data: any; // Generic type for data
}

export default function Receipt({ type, data }: ReceiptProps) {
  const renderContent = () => {
    switch (type) {
      case 'utang':
        const utangData = data;
        return (
          <View>
            <Text style={styles.header}>Items</Text>
            <View style={styles.itemWrapper}>
              <Text>Amount Paid</Text>
              <Text>x2</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.itemWrapper}>
              <Text>Total</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>

            <View style={styles.date}>
              <Text>{moment().format('LLL')}</Text>
              <Text>Transaction Type: Utang</Text>
              <Text>Name: Jick</Text>
            </View>
          </View>
        );

      case 'cash':
        const cashData = data;
        return (
          <View>
            <Text style={styles.header}>Items</Text>
            <View style={styles.itemWrapper}>
              <Text>Amount Paid</Text>
              <Text>x2</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text>Amount Paid</Text>
              <Text>x2</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.itemWrapper}>
              <Text>Cash</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text>Total</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text>Change</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.date}>
              <Text>{moment().format('LLL')}</Text>
              <Text>Transaction Type: Cash</Text>
            </View>
          </View>
        );

      case 'partial':
        const partialData = data;
        return (
          <View>
            <Text style={styles.header}>Items</Text>
            <View style={styles.itemWrapper}>
              <Text>Item 1 {partialData?.amountPaid}</Text>
              <Text>x2</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.itemWrapper}>
              <Text>Cash</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text>Total</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text>Change</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text>Balance</Text>
              <Text>{formatNumberWithPeso(100)}</Text>
            </View>
            <View style={styles.date}>
              <Text>{moment().format('LLL')}</Text>
              <Text>Transaction Type: Partial</Text>
              <Text>Name: Jick</Text>
            </View>
          </View>
        );

      default:
        return <Text>Unknown receipt type</Text>;
    }
  };

  return <ScrollView style={styles.container}>{renderContent()}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the scroll view to expand to fill the available space
    padding: 20,
    backgroundColor: '#fff',
    fontFamily: 'Inter_900Black',
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemHeader: {
    fontSize: theme.fontSizes.h5,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 8,
    width: '100%',
  },
  date: {
    alignItems: 'center',
    marginTop: 50,
  },
});
