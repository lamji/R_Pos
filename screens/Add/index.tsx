import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SelectComponent from '@/src/components/Select';
import styles from './useStyles';
import useViewModel from './useViewModel';
import ModalAlert from '@/src/components/Modal';
import ButtonCard from '@/src/components/ButtonCard';
import Input from '@/src/components/Input';

const AddScreen = () => {
  const {
    isModalVisible,
    handleCloseModal,
    isReset,
    handleGenerateBarcode,
    handleRedirectActions,
    formik,
    isLoading,
  } = useViewModel();

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Product type</Text>
              <SelectComponent
                data={[
                  { label: 'New Grocery', value: 'NG' },
                  { label: 'New Item', value: 'New' },
                ]}
                formik={formik}
                reset={isReset}
                error={formik.errors.type}
              />
              <Input
                label="ID"
                value={formik.values.id}
                onChangeText={formik.handleChange('id')}
                placeholder="Generated ID"
                error={formik.errors.id}
                editable={false}
              />
              <Input
                label="Barcode"
                value={formik.values.barcode}
                onChangeText={formik.handleChange('barcode')}
                placeholder="Generated barcode"
                error={formik.errors.barcode}
                editable={false}
              />
              <Input
                label="Name"
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                placeholder="Product name"
                error={formik.errors.name}
              />
              <Input
                label="Price"
                value={formik.values.price}
                onChangeText={formik.handleChange('price')}
                placeholder="Product price"
                error={formik.errors.price}
                keyboardType="numeric"
              />
              <Input
                label="Quantity"
                value={formik.values.quantity}
                onChangeText={formik.handleChange('quantity')}
                placeholder="Product quantity"
                error={formik.errors.quantity}
                keyboardType="numeric"
              />
              <Input
                label="Regular Price"
                value={formik.values.originalPrice}
                onChangeText={formik.handleChange('originalPrice')}
                placeholder="Product regular price"
                error={formik.errors.originalPrice}
                keyboardType="numeric"
              />

              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton} onPress={() => formik.handleSubmit()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleGenerateBarcode}>
                <Text style={styles.link}>No Barcode? Generate here</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRedirectActions('scanNew')}>
                <Text style={styles.link}>Has Barcode? Scan here</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        {/* Error Message */}
      </KeyboardAvoidingView>
      <ModalAlert visible={isModalVisible} onClose={handleCloseModal} title="Select Actions">
        <View style={styles.actionWrapper}>
          <ButtonCard
            title="Scan Item"
            iconName="barcode" // Icon name from Ionicons
            onPress={() => handleRedirectActions('scan')}
          />
          <ButtonCard
            title="Search Item"
            iconName="search" // Icon name from Ionicons
            onPress={() => handleRedirectActions('search')}
          />
        </View>
      </ModalAlert>
      <ModalAlert hideButton={true} visible={isLoading} onClose={() => null}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Adding Product</Text>
      </ModalAlert>
    </SafeAreaProvider>
  );
};

export default AddScreen;
