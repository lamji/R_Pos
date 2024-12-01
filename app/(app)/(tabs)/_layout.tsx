import { router, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { theme } from '@/src/theme';
import { useState, useEffect } from 'react';
import HeaderMenu from '@/src/components/headerMenu';
import styles from '@/styles/tabsLayoutStyles';
import { useSession } from '@/src/ctx';

export default function RootLayout() {
  const { signOut } = useSession();
  const [isViewVisible, setIsViewVisible] = useState(false); // State to manage visibility
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade-in
  const [slideAnim] = useState(new Animated.Value(-300)); // Animation value for slide-in

  useEffect(() => {
    if (isViewVisible) {
      // Trigger the animation to fade in and slide from left
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Reverse the animation when the view is hidden
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isViewVisible]);

  const toggleViewVisibility = () => {
    setIsViewVisible(!isViewVisible); // Toggle visibility on press
  };

  const CustomAppTitle = () => {
    return (
      <View style={styles.container}>
        {/* <Ionicons name="logo-react" size={24} color="white" style={styles.icon} /> */}
        <Text style={styles.text}>Mobile POS</Text>
      </View>
    );
  };

  return (
    <>
      {isViewVisible && ( // Conditionally render the view when it's visible
        <Animated.View
          style={[styles.overlay, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.headerMenu}>
            <Text style={styles.overlayText}>Navigation Menu</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleViewVisibility}>
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.menuList}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="cube" size={24} color="black" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="document-text" size={24} color="black" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Create Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="logo-buffer" size={24} color="black" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Subscription</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="cloud-upload" size={24} color="black" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Restore/Backup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signOut()} style={styles.menuItem}>
              <Ionicons name="cloud-upload" size={24} color="black" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.default,
          headerStyle: {
            backgroundColor: theme.colors.primary, // header background
            height: 80,
          },
          headerShadowVisible: false,
          headerTintColor: 'white', // header title color
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          headerTitleAlign: 'center',
          tabBarHideOnKeyboard: true,
          headerShown: true,
          headerTitle: () => <CustomAppTitle />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
            headerLeft: () => <HeaderMenu onPress={toggleViewVisibility} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'Transaction',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'receipt' : 'receipt-outline'} color={color} size={24} />
            ),
            headerLeft: () => <HeaderMenu onPress={toggleViewVisibility} />,
          }}
        />
        <Tabs.Screen
          name="utang"
          options={{
            title: 'Utang',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'list-circle' : 'list-circle-outline'}
                color={color}
                size={24}
              />
            ),
            headerLeft: () => <HeaderMenu onPress={toggleViewVisibility} />,
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: 'Add',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                color={color}
                size={24}
              />
            ),
            headerLeft: () => <HeaderMenu onPress={toggleViewVisibility} />,
          }}
        />
      </Tabs>
    </>
  );
}
