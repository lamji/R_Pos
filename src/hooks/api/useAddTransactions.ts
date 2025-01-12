import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import useApi from '../useLogin';

export interface QueryParams {
  queryKey?: string[];
  endPoints: string;
}

/**
 * Custom hook for adding transactions with mutation and success/error handling.
 * Returns the mutation object, allowing direct access to the response data.
 */
const useAddTransactions = ({ queryKey, endPoints }: QueryParams) => {
  const { request } = useApi(); // Access the API request functions
  const queryClient = useQueryClient(); // React Query client for invalidating queries

  // Define the mutation
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await request.post(endPoints, {
        token: true, // Pass token for authentication
        body: data, // Pass the request payload
      });
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: queryKey }); // Refresh related queries
      } else {
        Alert.alert(result.message); // Show alert for unsuccessful cases
      }
    },
    onError: (error) => {
      console.error('Request Error:', error); // Log the error
      Alert.alert('An error occurred while submitting the form.'); // Show alert for errors
    },
  });

  return mutation; // Return the mutation object
};

export default useAddTransactions;
