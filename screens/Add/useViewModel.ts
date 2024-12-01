import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { generateUniqueBarcode } from '@/src/helper/barcodegenerator';
import uuid from 'react-native-uuid';

import useAddItems from '@/src/hooks/useAddItems';
import useApi from '@/src/hooks/useLogin';
import { useSession } from '@/src/ctx';

export default function useViewModel() {
  const router = useRouter();
  const { request } = useApi();
  const { session, showLoader, isSuccess } = useSession();

  const [isReset, setIsReset] = useState(false);
  const [type, setType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

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
    onSubmit: async (values, { resetForm }) => {
      showLoader?.(true);
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
          },
        };

        try {
          const token = session;

          const result = await request.post('/add_items', {
            token,
            body: data,
          });

          if (result.success) {
            resetForm();
            isSuccess?.(true);
          } else {
            Alert.alert(result.message);
          }
          showLoader?.(false);
        } catch (err: any) {
          console.error('Request Error:', err);
          Alert.alert(err);
          showLoader?.(false);
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
    setType('');
    setIsReset(true);
    formik.setFieldValue('type', '');
  };

  const handleRedirectActions = (type: string) => {
    router.push(`/actions`);
    handleCloseModal();
  };

  useEffect(() => {
    if (formik.values.type === 'NG') {
      setModalVisible(true);
      setIsReset(false);
    }
  }, [formik.values.type]);

  return {
    formik,
    isModalVisible,
    handleCloseModal,
    isReset,
    handleGenerateBarcode,
    handleRedirectActions,
  };
}
