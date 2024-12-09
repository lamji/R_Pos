import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'global',
  initialState: {
    searchType: '',
    barcode: '',
  },
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setBarcode: (state, action) => {
      state.barcode = action.payload;
    },
  },
});

export const { setSearchType, setBarcode } = counterSlice.actions;

export const globalState = (state: any) => state.global;

export const getBarcode = (state: any) => state.global.barcode;

export default counterSlice.reducer;
