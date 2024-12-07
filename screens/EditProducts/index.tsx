import React from 'react';
import { decrement, increment, selectCount } from '@/src/redux/reducer/counter';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const EditProduct = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Redux Example</Text>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default EditProduct;
