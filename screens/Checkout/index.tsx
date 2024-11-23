import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from './useStyles';
import ButtonCard from '@/src/components/ButtonCard';
import FloatingIcon from '@/src/components/FloatButton';
import useViewModel from './useViewModel';
import Input from '@/src/components/Input';

import { AutocompleteInput } from '@/src/components/AutoComplete';
import { sampleData } from '@/src/contants/utang';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Checkout() {
  const { formik, total, handlePressCard, type, handleSelect, handleAddNew } = useViewModel();
  console.log('formik', JSON.stringify(formik, null, 2));

  const customNoResultOverride = (
    <TouchableOpacity style={styles.noResultContainer} onPress={handleAddNew}>
      <Text style={styles.noResultText}>No results found</Text>
      <Ionicons name="add-circle-outline" size={20} color="#007BFF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.inputWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <Text style={styles.header}>Payment Options</Text>
            <View style={styles.optionWrapper}>
              <ButtonCard
                title="Cash"
                iconName="cash" // Icon name from Ionicons
                onPress={() => handlePressCard('cash')}
                customStyles={{
                  marginRight: 18,
                }}
                isActive={type === 'cash'}
              />

              <ButtonCard
                title="Utang"
                iconName="people-outline" // Icon name from Ionicons
                onPress={() => handlePressCard('utang')}
                customStyles={{ marginRight: 18 }}
                isActive={type === 'utang'}
              />
              <ButtonCard
                title="Partial"
                iconName="wallet-outline" // Icon name from Ionicons
                onPress={() => handlePressCard('partial')}
                isActive={type === 'partial'}
              />
            </View>
            <View>
              {type === 'cash' && (
                <Input
                  label="Amount"
                  value={formik.values.amount}
                  onChangeText={formik.handleChange('amount')}
                  placeholder="Enter Amount"
                  error={formik.errors.amount}
                  keyboardType="numeric"
                />
              )}
              {type === 'utang' && (
                <View style={{ marginVertical: 10 }}>
                  <AutocompleteInput
                    data={sampleData}
                    placeholder="Search person..."
                    onSelect={handleSelect}
                    keyExtractor={(item) => item.id.toString()}
                    displayField="name"
                    maxHeight={100}
                    reset={false}
                    noResultOverride={customNoResultOverride}
                  />
                  <Input
                    label="Person Name"
                    value={String(formik.values.personName)}
                    onChangeText={formik.handleChange('amount_u')}
                    placeholder="Person name"
                    error={formik.errors.personName}
                    keyboardType="numeric"
                    editable={false}
                  />
                  <Input
                    label="Amount"
                    value={String(formik.values.amount_u)}
                    onChangeText={formik.handleChange('amount_u')}
                    placeholder="Enter cash"
                    error={formik.errors.amount_u}
                    keyboardType="numeric"
                    editable={false}
                  />
                  {/* <Input
                    label="Enter partial amount"
                    value={formik.values.amount_p}
                    onChangeText={formik.handleChange('amount_p')}
                    placeholder="Enter partial amount"
                    error={formik.errors.amount_p}
                    keyboardType="numeric"
                  /> */}
                </View>
              )}
            </View>
            <FloatingIcon label="Pay" handleCheckout={() => formik.handleSubmit()} amount={total} />
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
