import React, { useEffect, useState } from 'react';
import { TextInput, View, FlatList, Text, TouchableOpacity, TextInputProps } from 'react-native';
import { styles } from './useStyles';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';

interface AutocompleteInputProps<T> extends TextInputProps {
  data: T[]; // Generic data array
  placeholder?: string; // Placeholder text
  onSelect: (item: T) => void; // Callback when an item is selected
  keyExtractor: (item: T) => string; // Extracts a unique key from the item
  displayField: keyof T; // Specifies the field to display in the dropdown
  maxHeight: number;
  reset?: boolean;
  enableScan?: boolean;
  width?: any;
  noResultOverride?: any;
  handleScan?: () => void;
}

export function AutocompleteInput<T>({
  data,
  placeholder = 'Type to search...',
  onSelect,
  keyExtractor,
  displayField,
  maxHeight = 200,
  reset,
  width,
  enableScan,
  noResultOverride,
  handleScan,
  ...textInputProps
}: AutocompleteInputProps<T>) {
  const [query, setQuery] = useState<string>(''); // State for the input query
  const [filteredData, setFilteredData] = useState<T[]>([]); // State for filtered results

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      const results = data.filter((item) =>
        item[displayField]?.toString().toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    setQuery(item[displayField]?.toString() || ''); // Update input with selected item
    setFilteredData([]); // Clear dropdown after selection
    setQuery('');
  };

  useEffect(() => {
    if (reset) {
      setQuery('');
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, { width: width ?? '100%' }]}>
        <Ionicons
          name="search" // Search icon
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={query}
          onChangeText={handleSearch}
          placeholderTextColor="#888"
          {...textInputProps}
        />
        {enableScan && (
          <TouchableOpacity style={[styles.Scanner]} onPress={handleScan}>
            <Ionicons name="scan" size={50} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      {query.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          renderItem={({ item }: any) => (
            <TouchableOpacity style={styles.listItem} onPress={() => handleSelect(item)}>
              <Text>{item[displayField]}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              {noResultOverride || <Text style={styles.notFound}>No matching results</Text>}
            </View>
          }
          style={[
            styles.flatList,
            {
              maxHeight: maxHeight, // Limit height dynamically
            },
          ]}
        />
      )}
    </View>
  );
}
