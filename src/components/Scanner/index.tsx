import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { debounce } from 'lodash';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

type ScannerProps = {
  onScanned?: (barcode: string) => void;
  onImageCaptured?: (photo: any) => void;
  isCameraOnly: boolean;
  onClose?: () => void; // New close function prop
};

export default function CameraScanner({
  onScanned,
  onImageCaptured,
  isCameraOnly,
  onClose,
}: ScannerProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [sound, setSound] = useState<any>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(require('../../../assets/sounds/beep.mp3'));
      setSound(sound);
    }

    loadSound();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const debouncedOnScanned = debounce((barcode: string) => {
    onScanned?.(barcode);
    if (sound) {
      sound.replayAsync();
    }
  }, 300);

  const handleBarcodeScanned = (data: { type: string; data: string }) => {
    setScanned(true);
    debouncedOnScanned(data.data);
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5, // Adjust the quality (0.1 to 1.0)
          base64: false, // Disable base64 to save space
          skipProcessing: true, // Optional: Skip post-processing for faster capture
        });
        onImageCaptured?.(photo.uri);
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isCameraOnly ? (
        <CameraView style={styles.camera} ref={cameraRef} facing={facing} autofocus="off">
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          {/* Capture Button */}
          <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
            <Ionicons name="camera" size={40} color="white" />
          </TouchableOpacity>
        </CameraView>
      ) : (
        <CameraView
          style={styles.camera}
          ref={cameraRef}
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 10,
  },
  permissionButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  permissionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    height: 300,
    borderRadius: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
    zIndex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 15,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
});
