import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';

async function retrieveToken() {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      console.log('Token retrieved successfully:', token);
      return token;
    } else {
      console.log('No token stored');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
}

export default retrieveToken;
