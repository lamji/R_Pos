import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { debounce } from 'lodash';
import { Audio } from 'expo-av';

type ScannerProps = {
  onScanned: (barcode: string) => void;
};

export default function CameraScanner({ onScanned }: ScannerProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [sound, setSound] = useState<any>(null);

  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(require('../../../assets/sounds/beep.mp3'));
      setSound(sound);
    }

    loadSound();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const debouncedOnScanned = debounce((barcode: string) => {
    onScanned(barcode);
    if (sound) {
      sound.replayAsync(); // Play the sound
    }
  }, 300); // 300ms debounce delay

  const handleBarcodeScanned = (data: { type: string; data: string }) => {
    setScanned(true);
    debouncedOnScanned(data.data);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        autofocus="off"
        barcodeScannerSettings={{
          barcodeTypes: [
            'aztec',
            'ean13',
            'ean8',
            'qr',
            'pdf417',
            'upc_e',
            'datamatrix',
            'code39',
            'code93',
            'itf14',
            'codabar',
            'code128',
            'upc_a',
          ],
        }}
        onBarcodeScanned={(data: any) => (scanned ? undefined : handleBarcodeScanned(data))}
      >
        <View style={styles.buttonContainer}>{/* Optional button to flip camera */}</View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
