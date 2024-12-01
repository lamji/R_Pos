import React from 'react';
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';

import styles from './useStyles';
import ButtonCard from '@/src/components/ButtonCard';
import { mockReports } from '@/src/contants/reports';
import moment from 'moment';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Reports() {
  const sortedReports = mockReports.sort((a: any, b: any) => b.date - a.date);

  const handlePressItem = (item: any) => {
    Alert.alert('Report Selected', `You selected ${item.title}`);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePressItem(item)} activeOpacity={0.7}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>Date: {moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header}>Generate Reports</Text>
          <View style={styles.buttonWrapper}>
            <ButtonCard
              title="Z-Reading"
              iconName="list"
              onPress={() => alert('/fastMoving')}
              customStyles={{ marginRight: 18 }}
            />
            <ButtonCard
              title="Inventory"
              iconName="pricetag"
              onPress={() => alert('/fastMoving')}
              customStyles={{ marginRight: 18 }}
            />
            <ButtonCard
              title="Sales"
              iconName="analytics"
              onPress={() => alert('/fastMoving')}
              customStyles={{ marginRight: 18 }}
            />
            <ButtonCard title="List" iconName="list" onPress={() => alert('/fastMoving')} />
          </View>

          <FlatList
            data={sortedReports}
            keyExtractor={(item: any) => item._id}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
