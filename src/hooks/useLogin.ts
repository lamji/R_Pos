import { useState } from 'react';

const useApi = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Default headers
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const makeRequest = async (
    method: string,
    endpoint: string,
    { headers = {}, body = null, params = {}, redirect = 'follow', token }: any = {}
  ) => {
    const fullUrl = `${process.env.EXPO_PUBLIC_API_URL}${endpoint}`; // Base URL + endpoint

    // Merge default and custom headers
    const mergedHeaders = {
      ...defaultHeaders,
      ...headers,
      ...(token ? { Authorization: token } : {}),
    };

    // Handle query params
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    const fullUrlWithParams = queryString ? `${fullUrl}?${queryString}` : fullUrl;

    const requestOptions: RequestInit = {
      method,
      headers: mergedHeaders,
      body: body ? JSON.stringify(body) : null,
      redirect,
    };

    setLoading(true);

    try {
      const res = await fetch(fullUrlWithParams, requestOptions);
      const result = await res.json(); // Assuming API returns JSON
      setResponse(result);
      setError(null);
      return result;
    } catch (err: any) {
      setError(err);
      setResponse(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Shorthand methods for convenience
  const request = {
    get: (endpoint: string, options?: any) => makeRequest('GET', endpoint, options),
    post: (endpoint: string, options?: any) => makeRequest('POST', endpoint, options),
    put: (endpoint: string, options?: any) => makeRequest('PUT', endpoint, options),
    delete: (endpoint: string, options?: any) => makeRequest('DELETE', endpoint, options),
  };

  return { request, response, error, loading };
};

export default useApi;
