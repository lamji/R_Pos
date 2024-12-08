import { dataTypeP } from '@/src/contants/products';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import useApi from '@/src/hooks/useLogin';

import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { saveProductDetails } from '@/src/redux/reducer/products';

export default function useViewModel() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { request } = useApi();
  const [productsData, setProductsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [resetVal, setResetVal] = useState<boolean>(false);

  const { refetch, isError, data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['getItems'],
    queryFn: async () => {
      const result = await request.get('/get_items', {
        token: true,
      });
      return result;
    },
  });

  const handlePressList = ({ data }: { data: dataTypeP }) => {
    dispatch(saveProductDetails(data));
    router.push(`/edit`);
  };

  const handleModalCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleSearchResults = useCallback((results: any) => {
    setFilteredProducts(results);
    setResetVal(false);
  }, []);

  const onRefresh = useCallback(async () => {
    handleSearchResults('');
    setResetVal(true);
    await refetch();
    // refresh data from react query
  }, [refetch]);

  useEffect(() => {
    if (isSuccess) {
      setProductsData(data.data[0].items);
      setFilteredProducts(data.data[0].items);
    }

    if (isError) {
      Alert.alert(JSON.stringify(error.message, null, 2));
    }
  }, [isLoading, isSuccess, data]);

  return {
    data: productsData,
    handlePressList,
    openModal,
    setOpenModal,
    handleModalCloseAlert,
    openAlert,
    filteredProducts,
    handleSearchResults,
    onRefresh,
    refreshing,
    resetVal,
    isLoading,
  };
}
