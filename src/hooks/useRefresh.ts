import { useState, useCallback } from 'react';

const useRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate adding a new item to the data

      setRefreshing(false);
    }, 2000); // Simulate network delay or fetching data
  }, []);

  return {
    refreshing,
    onRefresh,
  };
};

export default useRefresh;
