import { dataTypeP, productsData } from '@/src/contants/products';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function useViewModel() {
  const [isReset, setIsReset] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Partial<dataTypeP>>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState(productsData); // Initial full list

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

  const handleSubmit = () => {
    // console.log('categoryError', categoryError);
    // Basic validation before submitting the form
    // if (!name || !description || !price || !quantity || !category) {
    //   alert('Please fill in all fields');
    //   return;
    // }
    // // Add further processing or API calls if necessary
    // alert('Form submitted');
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handlePressList = ({ data }: { data: dataTypeP }) => {
    setSelectedData(data);
    setOpenModal(true);

    formik.setFieldValue('name', data.name);
    formik.setFieldValue('price', data.price);
    formik.setFieldValue('quantity', data.quantity);
    formik.setFieldValue('regularPrice', data.regularPrice);
  };

  const handleModalCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleSearchResults = useCallback((results: any) => {
    setFilteredProducts(results);
  }, []);

  return {
    data: productsData,
    handleSelect,
    isReset,
    handlePressList,
    openModal,
    setOpenModal,
    selectedData,
    handleSubmit,
    handleModalClose,
    formik,
    isEdit,
    setIsEdit,
    handleModalCloseAlert,
    openAlert,
    filteredProducts,
    handleSearchResults,
  };
}
