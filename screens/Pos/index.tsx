import React from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { AutocompleteInput } from '@/src/components/AutoComplete';
import useViewModel from './useViewModel';
import styles from './useStyles';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import FloatingIcon from '@/src/components/FloatButton';
import ModalAlert from '@/src/components/Modal';
import CameraScanner from '@/src/components/Scanner';
import { theme } from '@/src/theme';
import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';
import { generateVintageColor, getInitials } from '@/src/helper/colorGenerator';

const WIDTH_SCREEN = Dimensions.get('window').width;
const ITEM_HEIGHT = 70;

export default function Products() {
  const {
    data,
    handleSelect,
    handlePressList,
    openModal,
    selectedData,
    handleModalClose,
    handleCheckout,
    isLoading,
    refreshing,
    onRefresh,
    posProducts,
    handleIncrement,
    handleDecrement,
    total,
    barcodeModal,
    handleBarcodeScanned,
    setBarcodeModal,
    handleRemoveProduct,
  } = useViewModel();

  console.log('posProducts', posProducts);

  const SwipeableItem = ({ item }: { item: any }) => {
    const swipeTranslateX = useSharedValue(0);
    const pressed = useSharedValue(false);

    const pan = Gesture.Pan()
      .onBegin(() => {
        pressed.value = true;
      })
      .onChange((event) => {
        if (event.translationX < 0) {
          swipeTranslateX.value = event.translationX;
        }
      })
      .onFinalize(() => {
        const shouldReveal = swipeTranslateX.value < -WIDTH_SCREEN * 0.3;
        if (shouldReveal) {
          swipeTranslateX.value = withSpring(-WIDTH_SCREEN * 0.3); // Stop at reveal threshold
        } else {
          swipeTranslateX.value = withSpring(0); // Reset position
        }
        pressed.value = false;
      });

    const transformStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: swipeTranslateX.value },
        { scale: withTiming(pressed.value ? 1.05 : 1) },
      ],
    }));

    const deleteButtonStyle = useAnimatedStyle(() => ({
      opacity: swipeTranslateX.value < -WIDTH_SCREEN * 0.3 ? 1 : 1,
    }));

    const avatarBackground = generateVintageColor();

    return (
      <GestureDetector gesture={pan}>
        <View style={{ position: 'relative', height: ITEM_HEIGHT, marginVertical: 3 }}>
          <Animated.View style={[styles.deleteButton, deleteButtonStyle]}>
            <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.swipeableContainer, transformStyle]}>
            <TouchableOpacity onPress={() => handlePressList(item)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    maxWidth: '80%',
                  }}
                >
                  <View style={{ marginRight: 5 }}>
                    {item.images ? (
                      <View>
                        <Image source={{ uri: `${item.images}` }} style={styles.image} />
                      </View>
                    ) : (
                      <View style={[styles.avatar, { backgroundColor: avatarBackground.hex }]}>
                        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
                      </View>
                    )}
                  </View>
                  <View>
                    <Text style={{ ...styles.title, width: '70%' }}>{item.name}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ color: theme.colors.default, fontSize: 10, marginRight: 10 }}>
                        Qty: {item.quantity}
                      </Text>
                      <Text style={{ color: theme.colors.default, fontSize: 10, marginRight: 10 }}>
                        Stocks: {item.stocks}
                      </Text>
                      <Text style={{ color: theme.colors.default, fontSize: 10 }}>
                        Price: {formatNumberWithPeso(item.price)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={styles.totalItems}>
                    {formatNumberWithPeso(item.price * item.quantity)}
                  </Text>
                </View>
                {/* <View style={styles.nameWrapper}>
                  {item.images ? (
                    <View>
                      <Image source={{ uri: `${item.images}` }} style={styles.image} />
                    </View>
                  ) : (
                    <View style={[styles.avatar, { backgroundColor: avatarBackground.hex }]}>
                      <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
                    </View>
                  )}
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ color: theme.colors.default, fontSize: 10, marginRight: 10 }}>
                        Qty: {item.quantity}
                      </Text>
                      <Text style={{ color: theme.colors.default, fontSize: 10, marginRight: 10 }}>
                        Stocks: {item.stocks}
                      </Text>
                      <Text style={{ color: theme.colors.default, fontSize: 10 }}>
                        Price: {formatNumberWithPeso(item.price)}
                      </Text>
                    </View>
                  </View>
                </View>
                */}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </GestureDetector>
    );
  };

  // const Scanner = () => {
  //   return (
  //     <>
  //       <CameraScanner
  //         isCameraOnly={false}
  //         onScanned={(barcode: string) => handleBarcodeScanned(barcode)}
  //       />
  //       <TouchableOpacity style={styles.closeButton} onPress={() => setBarcodeModal(false)}>
  //         <Ionicons name="close" size={30} color="white" />
  //       </TouchableOpacity>
  //     </>
  //   );
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, padding: 10 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
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
              handleScan={() => setBarcodeModal(true)}
            />
          </View>

          <FlatList
            data={posProducts}
            renderItem={({ item }) => <SwipeableItem item={item} />}
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
            ListEmptyComponent={
              <View style={styles.emptyList}>
                <Text style={{ fontWeight: '700', marginBottom: 4 }}>No products added</Text>
                <Text style={{ fontSize: 12 }}>Scan or search</Text>
              </View>
            }
          />

          <FloatingIcon label="Total" handleCheckout={handleCheckout} amount={total} />

          <ModalAlert
            title={selectedData.name}
            visible={openModal}
            hideButton={true}
            onClose={handleModalClose}
          >
            <View style={{ width: '100%' }}>
              <View style={styles.qtyWrapper}>
                <TouchableOpacity
                  style={[styles.buttonMinus, { justifyContent: 'center' }]}
                  onPress={() => handleDecrement(selectedData.id)}
                  disabled={selectedData.quantity === 1}
                >
                  <Ionicons name="remove-outline" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.qtyHead}>{selectedData.quantity}</Text>
                <TouchableOpacity
                  style={[styles.buttonAdd, { justifyContent: 'center' }]}
                  onPress={() => handleIncrement(selectedData.id)}
                  disabled={selectedData.quantity === selectedData.stocks}
                >
                  <Ionicons name="add-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.price}>
                  Price: {formatNumberWithPeso(selectedData?.price || 0)}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.button, { justifyContent: 'center' }]}
                onPress={handleModalClose}
              >
                <Ionicons name="save" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
              {selectedData.quantity === selectedData.stocks && (
                <Text style={{ color: 'red', fontSize: 11, textAlign: 'center', marginTop: 10 }}>
                  Out of stocks
                </Text>
              )}
            </View>
          </ModalAlert>

          <ModalAlert visible={barcodeModal} onClose={() => null} hideButton={true}>
            <CameraScanner
              isCameraOnly={false}
              onScanned={(barcode: string) => handleBarcodeScanned(barcode)}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setBarcodeModal(false)}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
          </ModalAlert>
        </Pressable>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
