import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Input from '@/src/components/Input';
import Barcode from '@/src/components/Barcode';
import styles from './useStyles';
import useViewModel from './useViewModel';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ModalAlert from '@/src/components/Modal';
import Modal from 'react-native-modal';

import CameraScanner from '@/src/components/Scanner';

const EditProduct = () => {
  const {
    product,
    isEdit,
    formik,
    selectedData,
    setIsEdit,
    handleEditPress,
    imagePlaceHolder,
    image,
    setImage,
    isLoading,
    handleMenuOption,
    isMenuVisible,
    setMenuVisible,
    isScannerVisible,
    setScannerVisible,
    handleImageCapture,
  } = useViewModel();

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for different platforms
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.colors.background,
              padding: 50,
            }}
          >
            <View style={{ width: '100%', marginBottom: 20 }}>
              {/* Add Circular Image */}

              {isEdit ? (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    marginBottom: 20,
                    shadowColor: '#000', // Add shadow for depth
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 5,
                    position: 'relative', // Allow for overlay positioning
                  }}
                  onPress={() => setMenuVisible(true)}
                  activeOpacity={0.8} // Feedback on press
                >
                  {/* User's Avatar */}
                  <Image
                    source={{
                      uri: image ? image : imagePlaceHolder,
                    }}
                    style={styles.inEditImage}
                  />

                  {/* Overlay with Edit Icon */}
                  <View style={styles.cameraWrapper}>
                    <Ionicons name="camera" size={25} color="#fff" />
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={{ alignItems: 'center', marginBottom: 0 }}>
                  <Image source={{ uri: imagePlaceHolder }} style={styles.nonEditImage} />
                </View>
              )}
              {isEdit && <Barcode value={product.barcode} width={1} height={50} />}
              {isEdit ? (
                <View>
                  <Input
                    label="Product name"
                    value={formik.values.name}
                    onChangeText={formik.handleChange('name')}
                    placeholder="Enter product name"
                    error={formik.errors.name}
                  />
                  <Input
                    label="Price"
                    value={String(formik.values.price)}
                    onChangeText={formik.handleChange('price')}
                    placeholder="Price"
                    error={formik.errors.price}
                    keyboardType="numeric"
                  />
                  <Input
                    label="Quantity"
                    value={String(formik.values.quantity)}
                    onChangeText={formik.handleChange('quantity')}
                    placeholder="Quantity"
                    error={formik.errors.quantity}
                    keyboardType="numeric"
                  />
                  <Input
                    label="Regular Price"
                    value={String(formik.values.regularPrice)}
                    onChangeText={formik.handleChange('regularPrice')}
                    placeholder="Regular Price"
                    error={formik.errors.regularPrice}
                    keyboardType="numeric"
                  />
                </View>
              ) : (
                <View>
                  {selectedData && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={styles.title}>{selectedData.name}</Text>
                      <Text style={styles.pText}>Price: {selectedData.price}</Text>
                      <Text style={styles.pText}>Stocks: {selectedData.quantity}</Text>
                      <Text style={styles.pText}>Regular Price: {selectedData.regularPrice}</Text>
                      <Text style={styles.pText}>
                        Interest: {(selectedData?.price ?? 0) - (selectedData.regularPrice ?? 0)}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
            {!isEdit && <Barcode value={product.barcode} width={1} height={50} />}

            {isEdit ? (
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={{ paddingHorizontal: 20 }}
                  onPress={() => {
                    setIsEdit(false);
                    setImage('');
                  }}
                >
                  <Ionicons name="close" size={30} color={theme.colors.error} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingHorizontal: 20 }}
                  onPress={() => formik.handleSubmit()}
                >
                  <Ionicons name="save" size={30} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.submitButton} onPress={handleEditPress}>
                <Text style={styles.submitButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
            <ModalAlert
              hideButton={true}
              visible={isLoading}
              onClose={function (): void {
                null;
              }}
            >
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={{ textAlign: 'center', marginTop: 10 }}>Updating Product</Text>
            </ModalAlert>

            <Modal
              isVisible={isMenuVisible}
              onBackdropPress={() => setMenuVisible(false)} // Close on background press
              style={{
                justifyContent: 'flex-end',
                margin: 0,
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleMenuOption('upload')}
                  style={{ padding: 15 }}
                >
                  <Text style={{ fontSize: 18 }}>Upload Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleMenuOption('camera')}
                  style={{ padding: 15 }}
                >
                  <Text style={{ fontSize: 18 }}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <ModalAlert visible={isScannerVisible} hideButton={true} onClose={() => null}>
              <CameraScanner
                onImageCaptured={(image: any) => handleImageCapture(image)}
                isCameraOnly={true}
                onClose={() => {
                  setScannerVisible(false);
                }}
              />
            </ModalAlert>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default EditProduct;
