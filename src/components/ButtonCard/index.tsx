import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed
import { theme } from '@/src/theme'; // Assuming theme is already defined in your project
import { styles as defaultStyles } from './useStyles'; // Rename to avoid conflicts

type ButtonCardProps = {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap; // Ensures proper icon name type-checking
  onPress: () => void;
  customStyles?: any; // Renamed from "styles" to "customStyles"
  isActive?: boolean;
};

const ButtonCard: React.FC<ButtonCardProps> = ({
  title,
  iconName,
  onPress,
  customStyles,
  isActive,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={customStyles}>
        <View
          style={[
            defaultStyles.card,
            { backgroundColor: isActive ? theme.colors.primary : theme.colors.background },
          ]}
        >
          <View style={defaultStyles.cardContent}>
            <Ionicons
              name={iconName}
              size={40}
              color={isActive ? theme.colors.background : theme.colors.primary}
              style={defaultStyles.icon}
            />
          </View>
        </View>
        <Text style={defaultStyles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCard;
