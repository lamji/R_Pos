import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'global',
  initialState: {
    searchType: '',
    barcode: '',
    scanned: {},
    alert: {
      alertType: '',
      messages: '',
      isOpen: false,
    },
    uploadImagePreviews: {
      data: { previews: [], images: [] },
    },
  },
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setBarcode: (state, action) => {
      state.barcode = action.payload;
    },
    setScanned: (state, action) => {
      state.scanned = action.payload;
    },
    setAlert: (state, action) => {
      state.scanned = action.payload;
    },
    setUpload(state, action) {
      state.uploadImagePreviews.data = action.payload;
    },
  },
});

export const { setSearchType, setBarcode, setScanned, setAlert, setUpload } = counterSlice.actions;

export const globalState = (state: any) => state.global;

export const getBarcode = (state: any) => state.global.barcode;

export const getScanned = (state: any) => state.global.scanned;

export const getAlert = (state: any) => state.global.alert;
export const getImagesState = (state: any) => state.global.uploadImagePreviews.data.previews;

export default counterSlice.reducer;
