import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 * Custom hook for making POST requests with mutation.
 *
 * @template TData - The expected response type from the server.
 * @template TVariables - The shape of the data being sent in the request.
 *
 * @param {string} url - The endpoint URL for the POST request.
 * @param {object} [options] - Optional settings.
 * @param {string[]} [options.queryKey] - Query key to invalidate after a successful mutation.
 * @param {UseMutationOptions<TData, AxiosError, TVariables>} [options.mutationOptions] - Options for the mutation.
 *
 * @returns {UseMutationResult<TData, AxiosError, TVariables>} Mutation-related methods and states.
 */
export const usePostMutation = <TData, TVariables>(
  url: string,
  method: any,
  options?: {
    queryKey?: string[];
    mutationOptions?: UseMutationOptions<TData, AxiosError, TVariables>;
  }
): UseMutationResult<TData, AxiosError, TVariables> => {
  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<TData, TVariables> = async (variables) => {
    const response: AxiosResponse<TData> = await axios.post(url, variables);
    return response.data;
  };

  return useMutation<TData, AxiosError, TVariables>(mutationFn, {
    ...options?.mutationOptions,
    onSuccess: (data, variables, context) => {
      if (options?.queryKey) {
        queryClient.invalidateQueries({ queryKey: options.queryKey });
      }
      if (options?.mutationOptions?.onSuccess) {
        options.mutationOptions.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.mutationOptions?.onError) {
        options.mutationOptions.onError(error, variables, context);
      } else {
        console.error('Mutation error:', error.message);
      }
    },
  });
};
