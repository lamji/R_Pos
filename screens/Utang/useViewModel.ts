import { sampleData } from '@/src/contants/utang';
import { dataType } from '@/src/types/utang';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';

export default function useViewModel() {
  const [filteredProducts, setFilteredProducts] = useState(sampleData);

  const handleSearchResults = useCallback((results: any) => {
    setFilteredProducts(results);
  }, []);

  const handlePressList = ({ data }: { data: dataType }) => {
    router.push(`/details`);
  };

  return {
    filteredProducts,
    handleSearchResults,
    handlePressList,
  };
}
