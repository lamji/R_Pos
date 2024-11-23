import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function useViewModel() {
  const router = useRouter();

  const [isReset, setIsReset] = useState(false);
  const [type, setType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const validationSchema = Yup.object({
    id: Yup.string(),
    type: Yup.string().required('Type is required'),
    barcode: Yup.string(),
    name: Yup.number().required('Product is required'),
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleGenerateBarcode = () => {
    Alert.alert('Generate Barcode');
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
