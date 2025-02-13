import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  productDetails: Record<string, any>; // State only for product details
  posProducts: Array<Record<string, any>>; // Array of POS products
}

const initialState: ProductState = {
  productDetails: {},
  posProducts: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveProductDetails: (state, action: PayloadAction<Record<string, any>>) => {
      state.productDetails = action.payload;
    },
    addPosProduct: (state, action: PayloadAction<Record<string, any>>) => {
      const { barcode, quantity } = action.payload;

      // Check if the product already exists in posProducts
      const existingProduct = state.posProducts.find((product) => product.barcode === barcode);

      if (existingProduct) {
        // If the product exists, update its quantity
        existingProduct.quantity += quantity;
      } else {
        // If the product does not exist, add it to posProducts
        state.posProducts.unshift(action.payload); // Add the new product to the top
      }
    },
    removePosProduct: (state, action: PayloadAction<{ id: string }>) => {
      state.posProducts = state.posProducts.filter((product) => product.id !== action.payload.id);
    },
    adjustPosProductQuantity: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const productIndex = state.posProducts.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        state.posProducts[productIndex].quantity += action.payload.amount;
      }
    },
  },
});

// Exporting actions
export const { saveProductDetails, addPosProduct, adjustPosProductQuantity, removePosProduct } =
  productSlice.actions;

// Selector to get product details
export const selectProductDetails = (state: { product: ProductState }) =>
  state.product.productDetails;

// Selector to get POS products
export const selectPosProducts = (state: { product: ProductState }) => state.product.posProducts;

// Exporting the reducer
export default productSlice.reducer;
