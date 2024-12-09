import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import styles from './useStyles';
import useViewModel from './useViewModel';
import CameraScanner from '@/src/components/Scanner';

export default function ActionsScreen() {
  const { type, handleScan } = useViewModel();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      {type === 'scan' || type === 'scanNew' ? (
        <CameraScanner isCameraOnly={false} onScanned={(barcode: string) => handleScan(barcode)} />
      ) : (
        <View></View>
      )}
    </View>
  );
}
