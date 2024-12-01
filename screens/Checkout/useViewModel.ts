import { useFormik } from 'formik';
import { useState } from 'react';
import { Alert } from 'react-native';
import * as Yup from 'yup';

// Validation schema for "cash"
const createValidationSchemaCash = (total: number) =>
  Yup.object({
    amount: Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .moreThan(total, `Amount must be greater than ${total}`),
  });

// Validation schema for "utang" (example: no validation for amount here)
const createValidationSchemaUtang = (total: number) =>
  Yup.object({
    personName: Yup.string()
      .typeError('Person name is required')
      .required('Person name is required, use the search box'),
    amount_u: Yup.number(),
  });

// Validation schema for "partial"
const createValidationSchemaPartial = (total: number) =>
  Yup.object({
    partialAmount: Yup.number()
      .typeError('Amount must be a number')
      .required('Partial amount is required')
      .lessThan(total, `Amount must be at least less than ${total}`),
    personName: Yup.string()
      .typeError('Person name is required')
      .required('Person name is required, use the search box'),
    cash: Yup.number().required('Cash amount is required'),
  });

export default function useViewModel() {
  const [type, setType] = useState<string>('cash'); // Default type is "cash"
  const total = 100; // Example total value

  // Determine the validation schema based on the type
  const validationSchema =
    type === 'cash'
      ? createValidationSchemaCash(total)
      : type === 'utang'
      ? createValidationSchemaUtang(total)
      : createValidationSchemaPartial(total);

  const formik = useFormik({
    initialValues: {
      amount: '',
      amount_u: '',
      amount_p: '',
      personName: '',
      partialAmount: '',
      cash: '',
    },
    validationSchema, // Use the dynamically selected schema
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handlePressCard = (selectedType: string) => {
    setType(selectedType); // Change the type dynamically
    if (selectedType === 'utang') {
      formik.setFieldValue('amount_u', total);
    }
  };

  const handleSelect = (item: any) => {
    // Alert.alert('Selected Item', `ID: ${item.id}\nName: ${item.name}`);
    formik.setFieldValue('personName', item.name);
  };

  const handleAddNew = () => {
    Alert.alert('Add New', 'You can implement an add-new-item flow here!');
  };

  return {
    formik,
    total,
    handlePressCard,
    type,
    handleSelect,
    handleAddNew,
  };
}
