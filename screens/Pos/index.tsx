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
  Alert,
  RefreshControl,
} from 'react-native';
import { AutocompleteInput } from '@/src/components/AutoComplete';
import useViewModel from './useViewModel';
import styles from './useStyles';

import { generateVintageColor, getInitials } from '@/src/helper/colorGenerator';
import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';
import { theme } from '@/src/theme';
import ModalAlert from '@/src/components/Modal';
import Input from '@/src/components/Input';
import Barcode from '@/src/components/Barcode';
import Ionicons from '@expo/vector-icons/Ionicons';
import FloatingIcon from '@/src/components/FloatButton';

export default function Products() {
  const {
    data,
    handleSelect,
    handlePressList,
    openModal,
    selectedData,
    handleModalClose,
    handleCheckout,

    handleModalCloseAlert,
    openAlert,
    refreshing,
    onRefresh,
  } = useViewModel();

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
                  color: theme.colors.default,
                }}
              >
                Qty: 3
              </Text>
              <Text
                style={{
                  color: theme.colors.default,
                }}
              >
                Price: {formatNumberWithPeso(data.price)}
              </Text>
            </View>
          </View>

          <Text style={styles.totalItems}>{formatNumberWithPeso(data.price * 5)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss} // Dismiss the keyboard when the user taps outside
      >
        <View style={styles.autoCompleteWrapper}>
          <AutocompleteInput
            data={data as any}
            placeholder="Search product..."
            onSelect={handleSelect}
            keyExtractor={(item) => item.id.toString()}
            displayField="name"
            maxHeight={210}
            reset={false}
            enableScan={true}
            width={'86%'}
          />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['grey']}
              progressBackgroundColor={'black'}
            />
          }
        />

        <FloatingIcon label="Checkout" handleCheckout={handleCheckout} amount={1234} />

        <ModalAlert title={selectedData.name} visible={openModal} onClose={handleModalClose}>
          <View style={{ width: '100%' }}>
            <View style={styles.qtyWrapper}>
              <TouchableOpacity style={[styles.buttonMinus, { justifyContent: 'center' }]}>
                <Ionicons name="remove-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.qtyHead}>14</Text>
              <TouchableOpacity style={[styles.buttonAdd, { justifyContent: 'center' }]}>
                <Ionicons name="add-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, { justifyContent: 'center' }]}>
              <Ionicons name="save" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </ModalAlert>
        <ModalAlert title="" visible={openAlert} onClose={handleModalCloseAlert}></ModalAlert>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
