import { dataTypeP, productsData } from '@/src/contants/products';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useLogin';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

export default function useViewModel() {
  const queryClient = useQueryClient();
  const [isReset, setIsReset] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Partial<dataTypeP>>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
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

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      return await request.put('/update_single_items', {
        token: true,
        body: {
          item: {
            id: selectedData.id, // Leave as string since it's an ID.
            name: formData?.name, // Leave as is since it's a string.
            price: Number(formData?.price), // Converts "10" to 10
            barcode: selectedData.barcode, // Leave as string since it's a barcode.
            quantity: Number(formData?.quantity), // Converts "10" to 10
            regularPrice: Number(formData?.regularPrice), // Converts "10" to 10
            date: new Date(),
          },
        },
      });
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['getItems'] });
      if (result.success) {
        Alert.alert(
          'Success',
          'Your operation was completed successfully!', // Message
          [
            { text: 'OK', onPress: () => setOpenModal(false) }, // Button
          ]
        );
      } else {
        Alert.alert('Error', 'Error updating the product', [
          { text: 'OK', onPress: () => console.log('OK Pressed') }, // Button
        ]);
      }
    },
    onError: (err: any) => {
      Alert.alert(err);
    },
  });

  const handleSelect = (item: dataTypeP) => {
    setIsReset(false);
    Alert.alert(
      'Selected Item',
      `ID: ${item.id}\nName: ${item.name}`,
      [
        {
          text: 'OK',
          onPress: () => setIsReset(true), // Set isReset to true when OK is pressed
        },
        {
          text: 'Cancel',
          style: 'cancel', // Optional cancel button
        },
      ],
      { cancelable: false }
    );
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setIsEdit(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Product name is required')
      .min(3, 'Name must be at least 3 characters long'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quantity is required'),
    regularPrice: Yup.number().required('Regular price is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      quantity: '',
      regularPrice: '',
    },
    validationSchema,
    validateOnChange: false, // Disable validation on value change
    validateOnBlur: true, // Enable validation on blur
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
  });

  const handlePressList = ({ data }: { data: dataTypeP }) => {
    router.push(`/edit`);
    // setSelectedData(data);
    // setOpenModal(true);
    // formik.setFieldValue('name', data.name);
    // formik.setFieldValue('price', data.price);
    // formik.setFieldValue('quantity', data.quantity);
    // formik.setFieldValue('regularPrice', data.regularPrice || 0);
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
    handleSelect,
    isReset,
    handlePressList,
    openModal,
    setOpenModal,
    selectedData,
    handleModalClose,
    formik,
    isEdit,
    setIsEdit,
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
