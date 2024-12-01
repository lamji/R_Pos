import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import retrieveToken from '@/src/helper/getToken'; // The function you already have to retrieve token

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  // Retrieve token on mount
  useEffect(() => {
    const fetchToken = async () => {
      const retrievedToken = await retrieveToken();
      setToken(retrievedToken);
    };

    fetchToken();
  }, []);

  // Function to clear the token
  const clearToken = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setToken(null); // Update the state to reflect logged out state
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken }}>{children}</AuthContext.Provider>
  );
};
