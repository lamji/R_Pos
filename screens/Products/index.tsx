import React from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import useViewModel from './useViewModel';
import styles from './useStyles';

import { generateVintageColor, getInitials } from '@/src/helper/colorGenerator';
import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';
import { theme } from '@/src/theme';
import ModalAlert from '@/src/components/Modal';
import Input from '@/src/components/Input';
import Barcode from '@/src/components/Barcode';
import SearchWithDebounce from '@/src/components/Search';

export default function Producst() {
  const {
    data,
    handleSelect,
    handlePressList,
    openModal,
    selectedData,
    isEdit,
    handleModalClose,
    setIsEdit,
    formik,
    handleModalCloseAlert,
    openAlert,
    filteredProducts,
    handleSearchResults,
    onRefresh,
    refreshing,
    resetVal,
    isLoading,
  } = useViewModel();

  // console.log('refreshing', formik.values);
  const sortedProducts = (filteredProducts || []).sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const Item = ({ data }: { data: any }) => {
    const avatarBackground = generateVintageColor();

    return (
      <TouchableOpacity onPress={() => handlePressList({ data })}>
        <View style={styles.item}>
          <View style={styles.nameWrapper}>
            {/* Conditional rendering for avatar or image */}
            {data.images ? (
              <Image source={{ uri: data.images }} style={styles.image} />
            ) : (
              <View style={[styles.avatar, { backgroundColor: avatarBackground.hex }]}>
                <Text style={styles.avatarText}>{getInitials(data.name)}</Text>
              </View>
            )}
            <View>
              <Text style={styles.title}>{data.name}</Text>
              <Text
                style={{
                  color: data.quantity >= 5 ? theme.colors.default : theme.colors.error,
                }}
              >
                Qty: {data.quantity}
              </Text>
            </View>
          </View>

          <Text style={styles.totalItems}>{formatNumberWithPeso(data.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={styles.autoCompleteWrapper}>
          <SearchWithDebounce
            onSearchResults={(results: any) => handleSearchResults(results)}
            data={data}
            placeholder="Search by name or barcode..."
            setValue={resetVal}
          />
        </View>

        <View style={{ paddingBottom: 100 }}>
          <FlatList
            data={sortedProducts}
            renderItem={({ item }: any) => <Item data={item} />}
            keyExtractor={(item: any) => item.id.toString()}
            style={styles.list}
            ListEmptyComponent={
              <View>
                <Text>No matching results</Text>
              </View>
            }
            refreshing={refreshing}
            // onRefresh={onRefresh}
          />
        </View>

        <ModalAlert title="Product Details" visible={openModal} onClose={handleModalClose}>
          <View style={{ width: '100%' }}>
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
                <Barcode value="123456789" width={3} height={50} />
                {selectedData && (
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.pText}>Product Name: {selectedData.name}</Text>
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
          {isEdit ? (
            <TouchableOpacity style={styles.submitButton} onPress={() => formik.handleSubmit()}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.submitButton} onPress={() => setIsEdit(true)}>
              <Text style={styles.submitButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </ModalAlert>
        <ModalAlert title="" visible={openAlert} onClose={handleModalCloseAlert}></ModalAlert>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
}
