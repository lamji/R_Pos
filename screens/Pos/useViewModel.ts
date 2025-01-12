import { dataTypeP } from '@/src/contants/products';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import useRefresh from '@/src/hooks/useRefresh';
import {
  addPosProduct,
  adjustPosProductQuantity,
  removePosProduct,
  selectPosProducts,
} from '@/src/redux/reducer/products';
import useApi from '@/src/hooks/useLogin';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

export default function useViewModel() {
  const dispatch = useDispatch();
  const { request } = useApi();
  const router = useRouter();
  const posProducts = useSelector(selectPosProducts);
  const { refreshing, onRefresh } = useRefresh();
  const [isReset, setIsReset] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Partial<dataTypeP>>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [barcodeModal, setBarcodeModal] = useState<boolean>(false);

  const handleIncrement = (id: any) => {
    dispatch(adjustPosProductQuantity({ id, amount: 1 }));
    if (selectedData.id === id) {
      setSelectedData((prevData) => ({
        ...prevData,
        quantity: (prevData?.quantity || 0) + 1,
      }));
    }
  };

  const handleDecrement = (id: any) => {
    // Dispatch to adjust the quantity in the global state
    dispatch(adjustPosProductQuantity({ id, amount: -1 }));

    // Update the quantity in selectedData if the IDs match
    if (selectedData.id === id) {
      setSelectedData((prevData) => ({
        ...prevData,
        quantity: Math.max((prevData?.quantity || 0) - 1, 0), // Ensure quantity doesn't go below 0
      }));
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['getItems'],
    queryFn: async () => {
      const result = await request.get('/get_items', {
        token: true,
      });
      return result;
    },
  });

  const handleSelect = (item: dataTypeP) => {
    setIsReset(false);
    const updatedData = {
      ...item,
      stocks: item.quantity,
      quantity: 1,
    };
    dispatch(addPosProduct(updatedData));
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setIsEdit(false);
  };

  const handlePressList = (item: any) => {
    console.log('item', item);
    setSelectedData(item);
    setOpenModal(true);
  };

  const handleModalCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleCheckout = () => {
    router.push('/(app)/checkout');
  };

  const getTotal = () => {
    return posProducts.reduce((total, product) => {
      return total + (product.quantity * product.price || 0);
    }, 0);
  };

  const handleBarcodeScanned = (b: string) => {
    if (b) {
      setBarcodeModal(false);

      const products = data?.data[0].items;

      // Create a map for quick lookups
      const itemMap = new Map<string, any>();
      products.forEach((item: any) => {
        itemMap.set(item.barcode, item);
      });

      // Find the item by barcode
      const foundItem = itemMap.get(b);

      if (foundItem) {
        const updatedData = {
          ...foundItem,
          quantity: 1,
        };
        dispatch(addPosProduct(updatedData));
        // Handle the found item (e.g., update state, display in UI, etc.)
      } else {
        console.log('Item not found');
        // Handle the case where the item doesn't exist
      }
    }
  };

  const handleRemoveProduct = (id: string) => {
    // Remove the product from the global state
    dispatch(removePosProduct({ id }));
    setOpenModal(false);
  };

  return {
    data: data?.data[0].items,
    handleSelect,
    isReset,
    handlePressList,
    openModal,
    setOpenModal,
    selectedData,
    handleModalClose,

    isEdit,
    setIsEdit,
    handleModalCloseAlert,
    openAlert,
    handleCheckout,
    refreshing,
    onRefresh,
    isLoading,
    posProducts,
    handleIncrement,
    handleDecrement,
    total: getTotal(),
    setBarcodeModal,
    barcodeModal,
    handleBarcodeScanned,
    handleRemoveProduct,
  };
}
