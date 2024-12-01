import axios, { AxiosRequestConfig } from 'axios';

// Request interceptor to add the Authorization header
const onRequest = async (config: AxiosRequestConfig): Promise<any> => {
  const token = "getCookie('t')"; // Fetch the token from cookies

  if (config.headers) {
    config.headers.Authorization = `${token}`;
  }

  // Explicitly cast to InternalAxiosRequestConfig
  return config as any;
};

// Error handling for request errors
const onRequestError = (error: any): Promise<any> => {
  return Promise.reject(error?.response?.data);
};

// Creating an Axios instance
const apiClient = axios.create({
  baseURL: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-ozwldyb/endpoint',
  headers: {
    'Content-Type': 'application/json',
  },
  maxBodyLength: Infinity, // Set a default max body length
});

// Applying the interceptors to the Axios instance
apiClient.interceptors.request.use(onRequest, onRequestError);

export default apiClient;
