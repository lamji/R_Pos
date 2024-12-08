import { dataTypeP, productsData } from '@/src/contants/products';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import useRefresh from '@/src/hooks/useRefresh';

import useApi from '@/src/hooks/useLogin';
import { useQuery } from '@tanstack/react-query';

export default function useViewModel() {
  const { request } = useApi();
  const router = useRouter();
  const { refreshing, onRefresh } = useRefresh();
  const [isReset, setIsReset] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Partial<dataTypeP>>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const { refetch, isError, data, error, isLoading, isSuccess } = useQuery({
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

  const handlePressList = ({ data }: { data: dataTypeP }) => {
    setSelectedData(data);
    setOpenModal(true);
  };

  const handleModalCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleCheckout = () => {
    router.push('/(app)/checkout');
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
  };
}
