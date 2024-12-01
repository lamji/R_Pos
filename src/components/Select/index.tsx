import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the dropdown icon
import { styles } from './useStyles'; // Assume styles are imported from an external file

type SelectComponentProps = {
  data: { label: string; value: string }[]; // Data for options
  formik: any;
  reset: boolean;
  error?: string;
};

const SelectComponent: React.FC<SelectComponentProps> = ({ data, formik, reset, error }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Control dropdown visibility

  //   const handleSearch = (text: string) => {
  //     const filtered = data.filter((item) => item.label.toLowerCase().includes(text.toLowerCase()));
  //     setFilteredData(filtered);
  //   };

  const handleSelect = (item: { label: string; value: string }) => {
    setSelectedValue(item.label);
    setIsOpen(false); // Close dropdown after selection
    formik.setFieldValue('type', item.value);
  };

  useEffect(() => {
    if (reset) {
      setSelectedValue('');
    }
  }, [reset]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.inputWrapper}>
            {/* TouchableOpacity as the clickable element for selecting */}
            <TouchableOpacity
              style={[styles.touchableInput, { borderColor: error ? 'red' : '#ccc' }]}
              onPress={() => setIsOpen((prev) => !prev)} // Toggle dropdown visibility
            >
              {/* Display the selected value */}
              <Text style={styles.selectedValue}>{selectedValue || 'Select a type'}</Text>
              {/* Dropdown Icon */}
              <Ionicons name="chevron-down" size={20} color="#000" style={styles.icon} />
            </TouchableOpacity>

            {/* List of options shown when the input is clicked */}
            {isOpen && (
              <FlatList
                data={data}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)}>
                    <View style={styles.option}>
                      <Text style={styles.optionText}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                style={styles.dropdown}
                scrollEnabled={false}
              />
            )}
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SelectComponent;
