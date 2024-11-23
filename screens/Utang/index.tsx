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
import { AutocompleteInput } from '@/src/components/AutoComplete';
import { useRouter } from 'expo-router';
import { dataType } from '@/src/types/utang';
import { sampleData } from '@/src/contants/utang';
import { generateVintageColor, getInitials } from '@/src/helper/colorGenerator';

export default function UtangScreen() {
  const router = useRouter();

  const handleSelect = (item: dataType) => {
    Alert.alert('Selected Item', `ID: ${item.id}\nName: ${item.name}`);
  };

  const handlePressList = ({ data }: { data: dataType }) => {
    console.log(data);
    router.push(`/details`);
  };

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
            <AutocompleteInput
              data={sampleData}
              placeholder="Search name..."
              onSelect={handleSelect}
              keyExtractor={(item) => item.id.toString()}
              displayField="name"
              maxHeight={210}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={sampleData}
            renderItem={({ item }) => <Item data={item} />}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
