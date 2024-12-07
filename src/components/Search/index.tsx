import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, Image } from 'react-native';

export type ProductType = {
  _id: string;
  name: string;
  barcode: string;
  price: number;
  images?: string;
};
type SearchWithDebounceProps<T> = {
  data: T[]; // Generic data type
  onSearchResults: (results: T[]) => void; // Callback to return filtered results
  filterFunction?: (item: T, searchTerm: string) => boolean; // Custom filtering logic
  placeholder?: string; // Optional placeholder for the search input
  debounceDelay?: number; // Optional debounce delay (default 500ms)
  setValue?: boolean;
};

const SearchWithDebounce = <T,>({
  data,
  onSearchResults,
  filterFunction,
  placeholder = 'Search...',
  debounceDelay = 500,
  setValue,
}: SearchWithDebounceProps<T>) => {
  const [searchTerm, setSearchTerm] = useState(''); // User input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filter results based on debounced term
  useEffect(() => {
    const filteredProducts = data.filter(
      (product: any) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product?.barcode?.includes(debouncedSearchTerm)
    );

    onSearchResults(filteredProducts);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (setValue) {
      setSearchTerm('');
    }
  }, [setValue]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default SearchWithDebounce;
