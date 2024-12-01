import { useSession } from '@/src/ctx';
import useApi from '@/src/hooks/useLogin';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const SampleRequest = () => {
  const { session, isLoading } = useSession();
  const { request, response, error, loading } = useApi();
  const [data, setFetch] = useState(false);

  const sendRequest = async () => {
    try {
      const token = session;

      const payload = {
        type: 'items',
        items: {
          id: '678901225',
          name: 'test dara2',
          price: 10,
          barcode: '203299107421',
          quantity: 10,
          regularPrice: null,
          quantityHistory: [],
          date: '2024-12-01T04:15:05.657Z',
        },
      };

      const result = await request.post('/add_items', {
        token,
        body: payload,
      });
    } catch (err) {
      console.error('Request Error:', err);
    }
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {response && <Text>Response: {JSON.stringify(response)}</Text>}
      {error && <Text>Error: {error}</Text>}
      <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={() => sendRequest()}>
        <Text>Press</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SampleRequest;
