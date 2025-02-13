import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { generateUniqueBarcode } from '@/src/helper/barcodegenerator';
import uuid from 'react-native-uuid';

import useApi from '@/src/hooks/useLogin';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBarcode,
  getScanned,
  setBarcode,
  setScanned,
  setSearchType,
} from '@/src/redux/reducer/global';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useViewModel() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const barcodeState = useSelector(getBarcode);
  const scannedProducts = useSelector(getScanned);
  const router = useRouter();
  const { request } = useApi();

  const [isReset, setIsReset] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await request.post('/add_items', {
        token: true,
        body: data,
      });
    },
    onSuccess: (result) => {
      if (result.success) {
        setIsLoading(false);
        dispatch(setBarcode(''));
        dispatch(setScanned({}));
        formik.resetForm(); // Reset the form here
        formik.setFieldValue('type', '');
      } else {
        Alert.alert(result.message);
      }
      queryClient.invalidateQueries({ queryKey: ['getItems'] });
    },
    onError: (error) => {
      console.error('Request Error:', error);
      Alert.alert('An error occurred while submitting the form.');
      setIsLoading(false);
    },
  });

  const validationSchema = Yup.object({
    id: Yup.string(),
    type: Yup.string().required('Type is required'),
    barcode: Yup.string(),
    name: Yup.string().required('Product is required'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quantity is required'),
    originalPrice: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      type: '',
      barcode: '',
      name: '',
      price: '',
      quantity: '',
      originalPrice: '',
    },
    validationSchema,
    validateOnChange: true, // Disable validation on value change
    validateOnBlur: true, // Enable validation on blur
    onSubmit: async (values) => {
      setIsLoading(true);
      if (values.type === 'New') {
        //add new item
        const data = {
          type: 'items',
          items: {
            id: values.id,
            name: values.name,
            price: values.price,
            barcode: values.barcode,
            quantity: values.quantity,
            regularPrice: values.originalPrice,
            date: new Date(),
            images: '',
          },
        };

        try {
          mutation.mutate(data);
        } catch (err: any) {
          console.error('Request Error:', err);
          Alert.alert(err);
          setIsLoading(false);
        }
      } else {
        // update single items
      }
    },
  });

  const handleGenerateBarcode = () => {
    const barcode = generateUniqueBarcode();
    formik.setFieldValue('id', uuid.v4());
    formik.setFieldValue('barcode', barcode);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setIsReset(true);
    formik.setFieldValue('type', '');
  };

  const handleRedirectActions = (type: string) => {
    handleCloseModal();
    dispatch(setSearchType(type));
    if (type === 'scanNew') {
      formik.setFieldValue('type', 'New');
    } else {
      formik.setFieldValue('type', 'NG');
    }
    setTimeout(() => {
      router.push(`/actions`);
    }, 300);
  };

  const handleOnSelect = (val: string) => {
    if (val === 'NG') {
      setModalVisible(true);
      setIsReset(false);
    }
  };

  useEffect(() => {
    if (barcodeState) {
      formik.setFieldValue('barcode', barcodeState);
      formik.setFieldValue('id', uuid.v4());
    }
  }, [barcodeState]);

  useEffect(() => {
    if (scannedProducts) {
      formik.setFieldValue('id', scannedProducts[0]?.id ?? '');
      formik.setFieldValue('type', 'NG');
      formik.setFieldValue('barcode', scannedProducts[0]?.barcode ?? '');
      formik.setFieldValue('name', scannedProducts[0]?.name ?? '');
      formik.setFieldValue('price', scannedProducts[0]?.price?.toString() ?? '');
      formik.setFieldValue('quantity', scannedProducts[0]?.quantity?.toString() ?? '');
      formik.setFieldValue('originalPrice', scannedProducts[0]?.regularPrice?.toString() ?? '');
    }
  }, [scannedProducts]);

  return {
    formik,
    isModalVisible,
    handleCloseModal,
    isReset,
    handleGenerateBarcode,
    handleRedirectActions,
    isLoading,
    setModalVisible,
    handleOnSelect,
  };
}
