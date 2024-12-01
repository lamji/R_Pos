import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal as RNModal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  hideButton?: boolean;
};

const ModalAlert: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  children,
  hideButton,
}) => {
  return (
    <RNModal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose} // Handle back button on Android
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalContainer}>
          <View style={styles.headerWrapper}>
            {/* Title */}
            {title && <Text style={styles.modalTitle}>{title}</Text>}

            {/* Close Icon */}
            {!hideButton && (
              <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                <Ionicons name="close" size={26} color="#000" />
              </TouchableOpacity>
            )}
          </View>

          {/* Scrollable Content */}
          <ScrollView contentContainerStyle={styles.scrollContent}>{children}</ScrollView>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%', // Prevent the modal from taking full height
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 10, // Ensure the icon is above other content
    width: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  scrollContent: {
    flexGrow: 1, // Allows content to scroll if needed
    paddingBottom: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ModalAlert;
