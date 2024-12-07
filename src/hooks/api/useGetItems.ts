import { useQuery } from 'react-query';
import useApi from '../useLogin';

export const useGetProductList = () => {
  const { request } = useApi();

  return useQuery({
    keepPreviousData: true,
    queryKey: ['getAllItems'],
    queryFn: async () => {
      const res = await request.get('/get_items', {
        token: true,
      });
      return res;
    },
  });
};
