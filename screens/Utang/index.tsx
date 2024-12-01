import React from 'react';
import {
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './useStyles';
import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';

import { dataType } from '@/src/types/utang';
import { sampleData } from '@/src/contants/utang';
import { generateVintageColor, getInitials } from '@/src/helper/colorGenerator';
import SearchWithDebounce from '@/src/components/Search';
import useViewModel from './useViewModel';

export default function UtangScreen() {
  const { filteredProducts, handleSearchResults, handlePressList } = useViewModel();

  const Item = ({ data }: { data: dataType }) => {
    const avatarBackground = generateVintageColor();
    return (
      <TouchableOpacity onPress={() => handlePressList({ data })}>
        <View style={styles.item}>
          <View style={styles.nameWrapper}>
            {/* Avatar Circle */}
            <View style={[styles.avatar, { backgroundColor: avatarBackground.hex }]}>
              <Text style={styles.avatarText}>{getInitials(data.name)}</Text>
            </View>
            {/* Name */}
            <Text style={styles.title}>{data.name}</Text>
          </View>

          <Text style={styles.totalItems}>{formatNumberWithPeso(data.total)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss} // Dismiss the keyboard when the user taps outside
      >
        <View style={styles.container}>
          <View style={styles.jumboTron}>
            <Text style={styles.total}>{formatNumberWithPeso(10000)}</Text>
            <Text style={styles.overAll}>Overall Utang</Text>
          </View>
          <View style={styles.searchWrapper}>
            <SearchWithDebounce
              data={sampleData}
              onSearchResults={(results: any) => handleSearchResults(results)}
              placeholder="Search by name..."
            />
          </View>
        </View>
        <View>
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => <Item data={item} />}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            ListEmptyComponent={
              <View>
                <Text>No matching results</Text>
              </View>
            }
          />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
