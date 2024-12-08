import useApi from '@/src/hooks/useLogin';
import { saveProductDetails, selectProductDetails } from '@/src/redux/reducer/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function useViewModel() {
  const queryClient = useQueryClient();
  const { request } = useApi();
  const dispatch = useDispatch();
  const product = useSelector(selectProductDetails);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [val, setVal] = useState<any>();
  const [image, setImage] = useState<string | null>(null);
  const [imageDb, setImageDb] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imagePlaceHolder = product.images
    ? `data:image/png;base64,${product.images}`
    : 'https://via.placeholder.com/100';

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // Set quality to 0.5 to reduce image quality
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setImageDb(base64Image);
    }
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (formData: any) => {
      setIsLoading(true);
      try {
        return await request.put('/update_single_items', {
          token: true,
          body: {
            item: {
              id: product.id, // Leave as string since it's an ID.
              name: formData?.name, // Leave as is since it's a string.
              price: Number(formData?.price), // Converts "10" to 10
              barcode: product.barcode, // Leave as string since it's a barcode.
              quantity: Number(formData?.quantity), // Converts "10" to 10
              regularPrice: Number(formData?.regularPrice), // Converts "10" to 10
              date: new Date(),
              images: imageDb,
            },
          },
        });
      } catch (error) {
        setIsLoading(false);
        return error;
      }
    },
    onSuccess: (result) => {
      console.log('results', result);
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ['getItems'] });
      if (result.success) {
        Alert.alert(
          'Success',
          'Your operation was completed successfully!' // Message
        );
        setIsEdit(false);
        dispatch(
          saveProductDetails({
            id: product.id, // Leave as string since it's an ID.
            name: val?.name, // Leave as is since it's a string.
            price: val?.price, // Converts "10" to 10
            barcode: product.barcode, // Leave as string since it's a barcode.
            quantity: val?.quantity, // Converts "10" to 10
            regularPrice: val?.regularPrice, // Converts "10" to 10
            images: imageDb,
          })
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
      mutate(values);
      setVal(values);
    },
  });

  const handleEditPress = () => {
    formik.setFieldValue('name', product.name);
    formik.setFieldValue('price', product.price);
    formik.setFieldValue('quantity', product.quantity);
    formik.setFieldValue('regularPrice', product.regularPrice || 0);

    setIsEdit(true);
  };

  return {
    isEdit,
    product,
    formik,
    selectedData: product,
    setIsEdit,
    handleEditPress,
    imagePlaceHolder,
    pickImage,
    image,
    setImage,
    isSuccess,
    isLoading,
  };
}
