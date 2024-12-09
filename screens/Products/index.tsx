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
    handlePressList,
    handleModalCloseAlert,
    openAlert,
    filteredProducts,
    handleSearchResults,
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
              <Image
                source={{ uri: `data:image/png;base64,${data.images}` }}
                style={styles.image}
              />
            ) : (
              <View style={[styles.avatar, { backgroundColor: avatarBackground.hex }]}>
                <Text style={styles.avatarText}>{getInitials(data.name)}</Text>
              </View>
            )}
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.title}>{data.name}</Text>
              <Text
                style={{
                  color: data.quantity >= 5 ? theme.colors.default : theme.colors.error,
                }}
              >
                Qty: {data.quantity}
              </Text>
              <Text>{data.barcode}</Text>
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

        <ModalAlert title="" visible={openAlert} onClose={handleModalCloseAlert}></ModalAlert>
        {isLoading && (
          <ModalAlert
            hideButton={true}
            visible={isLoading}
            onClose={function (): void {
              null;
            }}
          >
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>Retrieving Products</Text>
          </ModalAlert>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
}
