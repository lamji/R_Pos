import { useState, useCallback } from 'react';
import { useSession } from '../ctx';

// not in used

const useAddItems = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const { session } = useSession();

  const addItems = useCallback(async (itemData: any) => {
    setLoading(true);
    setError(null);

    const myHeaders = new Headers();
    myHeaders.append('Authorization', session as string);
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      type: 'items',
      items: itemData,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        itemData,
      }),
      redirect: 'follow',
    };

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/add_items`,
        requestOptions as any
      );

      //   if (!res.ok) {
      //     throw new Error(`HTTP error! status: ${res.status}`);
      //   }

      const result = await res.json();

      setResponse(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { addItems, loading, response, error };
};

export default useAddItems;
