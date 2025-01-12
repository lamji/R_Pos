import { useMemo } from 'react';

type Query = {
  id?: string;
  name?: string;
  [key: string]: any; // For more fields
};

const useProductQuery = (products: any, query: Query) => {
  const product = useMemo(() => {
    if (!query || Object.keys(query).length === 0) return null;

    return (
      products.find((product: any) =>
        Object.entries(query).every(([key, value]) => product[key] && product[key] === value)
      ) || null
    );
  }, [products, query]);

  return product;
};

export default useProductQuery;

// Usages
// const product = useProductQuery(products, { name: 'Product B' });
// console.log(product);
