import useApi from '@/src/hooks/useLogin';
import { globalState, setBarcode, setScanned } from '@/src/redux/reducer/global';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function useViewModel() {
  const dispatch = useDispatch();
  const dataState = useSelector(globalState);
  const { request } = useApi();
  const [productsData, setProductsData] = useState([]);

  const { isError, data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['getItems'],
    queryFn: async () => {
      const result = await request.get('/get_items', {
        token: true,
      });
      return result;
    },
  });

  const handleScan = (barcode: string) => {
    if (dataState.searchType === 'scanNew') {
      //Just dispatch the barcode to populate the barcode input in add product
      dispatch(setBarcode(barcode));
      router.back();
    } else {
      const filteredProducts = productsData.filter(
        (product: any) =>
          product.name.toLowerCase().includes(barcode.toLowerCase()) ||
          product?.barcode?.includes(barcode)
      );
      dispatch(setScanned(filteredProducts));
      router.back();
      // search product by barcode
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setProductsData(data.data[0].items);
    }

    if (isError) {
      Alert.alert(JSON.stringify(error.message, null, 2));
    }
  }, [isLoading, isSuccess, data]);

  return {
    type: dataState.searchType,
    handleScan,
    productsData,
  };
}
