import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
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
import ModalAlert from '@/src/components/Modal';
import Receipt from '@/src/components/receipts';
import { theme } from '@/src/theme';
import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';

export default function Checkout() {
  const { formik, total, handlePressCard, type, handleSelect, handleAddNew } = useViewModel();

  const customNoResultOverride = (
    <TouchableOpacity style={styles.noResultContainer} onPress={handleAddNew}>
      <Text style={styles.noResultText}>No results found</Text>
      <Ionicons name="add-circle-outline" size={20} color="#007BFF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for Android
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Offset for header
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 20,
              paddingHorizontal: 16,
            }}
            keyboardShouldPersistTaps="handled" // Ensures taps outside dismiss the keyboard
          >
            <Pressable onPress={Keyboard.dismiss}>
              <Text style={styles.header}>Payment Options</Text>
              <View style={styles.optionWrapper}>
                <ButtonCard
                  title="Cash"
                  iconName="cash"
                  onPress={() => handlePressCard('cash')}
                  customStyles={{ marginRight: 18 }}
                  isActive={type === 'cash'}
                />
                <ButtonCard
                  title="Utang"
                  iconName="people-outline"
                  onPress={() => handlePressCard('utang')}
                  customStyles={{ marginRight: 18 }}
                  isActive={type === 'utang'}
                />
                <ButtonCard
                  title="Partial"
                  iconName="wallet-outline"
                  onPress={() => handlePressCard('partial')}
                  isActive={type === 'partial'}
                />
              </View>
              <View>
                {type === 'cash' && (
                  <Input
                    label="Cash amount"
                    value={formik.values.amount}
                    onChangeText={formik.handleChange('amount')}
                    placeholder="Enter cash amount"
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
                  </View>
                )}
                {type === 'partial' && (
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
                      label="Enter partial amount"
                      value={formik.values.partialAmount}
                      onChangeText={formik.handleChange('partialAmount')}
                      placeholder="Enter partial amount"
                      error={formik.errors.partialAmount}
                      keyboardType="numeric"
                    />
                    <Input
                      label="Cash"
                      value={String(formik.values.cash)}
                      onChangeText={formik.handleChange('cash')}
                      placeholder="Enter cash"
                      error={formik.errors.cash}
                      keyboardType="numeric"
                      editable={false}
                    />
                  </View>
                )}
                <ModalAlert
                  title="Recepts"
                  visible={false}
                  onClose={function (): void {
                    null;
                  }}
                >
                  <Receipt type={'utang'} data={undefined} />
                </ModalAlert>
              </View>
            </Pressable>
          </ScrollView>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                padding: 20,
                alignItems: 'center',
                borderRadius: 0,
                position: 'absolute',
                // bottom: 10,
                right: 0,
                // elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                width: '100%',
              }}
              activeOpacity={0.8}
              onPress={() => {
                console.log('Button pressed');
                formik.handleSubmit();
              }}
            >
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                Pay: {formatNumberWithPeso(total)}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
