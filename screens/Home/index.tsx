import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import styles from './useStyles';
import SaleCard from '@/src/components/SaleCard';
import ButtonCard from '@/src/components/ButtonCard';
import useViewModel from './useViewModel';

export default function Index() {
  const { handleRedirect } = useViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.jumbotron}>
        <Text style={styles.helloText}>Hello!</Text>
        <Text style={styles.nameText}>Jick Lampago</Text>
      </View>
      <View style={styles.bigCard}>
        <SaleCard header={'Yesterday'} amount={500} utanAmount={250} cashAmount={30} />
        <SaleCard header={'Today'} amount={1000} utanAmount={100} cashAmount={500} />
      </View>
      <View style={styles.cardsWrapper}>
        <ButtonCard
          title="Products"
          iconName="cube" // Icon name from Ionicons
          onPress={() => handleRedirect('/products')}
        />
        <ButtonCard
          title="POS"
          iconName="pricetag" // Icon name from Ionicons
          onPress={() => handleRedirect('/pos')}
        />
        <ButtonCard
          title="Reports"
          iconName="stats-chart" // Icon name from Ionicons
          onPress={() => handleRedirect('/reports')}
        />
        <ButtonCard
          title="OOS"
          iconName="warning-outline" // Icon name from Ionicons
          onPress={() => handleRedirect('/oos')}
        />
      </View>
      <View style={styles.cardsWrapper2}>
        <ButtonCard
          title="Fast Moving"
          iconName="rocket" // Icon name from Ionicons
          onPress={() => handleRedirect('/fastMoving')}
          customStyles={{ marginRight: 18 }}
        />
        <ButtonCard
          title="C-Drawer"
          iconName="briefcase" // Icon name from Ionicons
          onPress={() => handleRedirect('/fastMoving')}
          customStyles={{ marginRight: 18 }}
        />
        <ButtonCard
          title="G-List"
          iconName="list" // Icon name from Ionicons
          onPress={() => handleRedirect('/fastMoving')}
          customStyles={{ marginRight: 18 }}
        />
        <ButtonCard
          title="G-Reports"
          iconName="list" // Icon name from Ionicons
          onPress={() => handleRedirect('/fastMoving')}
        />
      </View>
    </View>
  );
}
