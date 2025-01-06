import React from 'react';
import ModalAlert from '../Modal';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getAlert, setAlert } from '@/src/redux/reducer/global';

export default function Alert() {
  const alertState = useSelector(getAlert);
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(
      setAlert({
        isOpen: false,
        messages: '',
        alertType: '',
      })
    );
  };
  return (
    <ModalAlert hideButton={true} visible={alertState?.isOpen} onClose={() => null}>
      <View>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={alertState?.alertType === 'failed' ? 'alert' : 'checkmark-circle-outline'}
            size={44}
            color={alertState?.alertType === 'failed' ? 'red' : 'green'}
          />
        </View>
        <Text style={styles.text}>{alertState?.messages}</Text>
        <TouchableOpacity onPress={() => handlePress}>
          <Text style={styles.buttonOk}>OK</Text>
        </TouchableOpacity>
      </View>
    </ModalAlert>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonOk: {
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    padding: 10,
    width: '30%',
    alignSelf: 'center',
    borderRadius: 20,
    color: theme.colors.background,
  },
});
