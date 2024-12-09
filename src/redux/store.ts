import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducer/counter';
import productReducer from './reducer/products';
import globalReducer from './reducer/global';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    global: globalReducer,
  },
});
