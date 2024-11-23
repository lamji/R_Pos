import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icon library
import styles from './useStyles';
import moment from 'moment';
import { formatNumberWithPeso } from '@/src/helper/numberCommaSeparator';
import { useRouter } from 'expo-router';
import { theme } from '@/src/theme';

type ItemProps = {
  data: {
    title: string;
    id: string;
    date: string;
    amount: number;
  };
};

export default function DashboardScreen() {
  const router = useRouter();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cash',
      date: '2024-11-22T10:30:00',
      amount: 20,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Utang',
      date: '2024-11-21T14:45:00',
      amount: 50,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Partial',
      date: '2024-11-20T09:15:00',
      amount: 30,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72s',
      title: 'Utang',
      date: '2024-11-19T16:00:00',
      amount: 40,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d721',
      title: 'Cash',
      date: '2024-11-18T12:20:00',
      amount: 100,
    },
  ];

  const handleDatePickerPress = () => {
    // Placeholder for date picker functionality
    alert('Date Picker pressed!');
  };

  const Item = ({ data }: ItemProps) => (
    <TouchableOpacity style={styles.item} onPress={() => router.push(`/details`)}>
      <View>
        <Text style={styles.date}>{moment(data.date).format('LT')}</Text>
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <Text style={styles.title}>{formatNumberWithPeso(data.amount)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>Transactions</Text>
        <View style={styles.datePickerContainer}>
          <Text style={styles.text2}>{moment().format('LL')}</Text>
          <TouchableOpacity onPress={handleDatePickerPress}>
            <Ionicons
              name="calendar"
              size={24}
              color={theme.colors.primary}
              style={styles.datePickerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
