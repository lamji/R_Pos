import { useFormik } from 'formik';
import { useState } from 'react';
import { Linking } from 'react-native';
import * as Yup from 'yup';

export default function useViewModel({ handleSignIn }: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: DisplayingErrorMessagesSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await handleSignIn(values); // Pass the whole values object
      } catch (error) {
        setAlertOpen(true); // Show alert modal if login fails
      } finally {
        setSubmitting(false); // Reset the submitting state
      }
    },
  });

  const handleLinkPress = () => {
    const url = 'https://lamji.github.io/pos.github.io/index.html'; // Replace with your link
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return {
    isPasswordVisible,
    setIsPasswordVisible,
    handleLinkPress,
    formik,
    handleCloseAlert,
    alertOpen,
  };
}
