import { createSlice } from "@reduxjs/toolkit";

const normalizeItem = (item) => ({
  ...item,
  qty: Math.max(0, Number(item.qty ?? item.quantity ?? 0)),
});

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return Array.isArray(action.payload)
        ? action.payload.map(normalizeItem)
        : [];
    },

    addToCart: (state, action) => {
      const product = action.payload;
      const item = state.find((item) => item.id === product.id);

      if (item) {
        item.qty = Number(item.qty ?? item.quantity ?? 1) + 1;
        delete item.quantity;
      } else {
        state.push({ ...product, qty: 1 });
      }
    },

    changeQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.find((item) => item.id === id);

      if (!item) return state;
      if (Number(qty) <= 0) {
        return state.filter((item) => item.id !== id);
      }

      item.qty = Number(qty);
      delete item.quantity;
    },

    deleteCart: (state, action) =>
      state.filter((item) => item.id !== action.payload),

    removeFromCart: (state, action) =>
      state.filter((item) => item.id !== action.payload),

    plusCart: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) item.qty = Number(item.qty ?? item.quantity ?? 1) + 1;
    },

    minusCart: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (!item) return state;

      const qty = Number(item.qty ?? item.quantity ?? 1);
      if (qty <= 1) {
        return state.filter((item) => item.id !== action.payload);
      }

      item.qty = qty - 1;
      delete item.quantity;
    },

    clearCart: () => [],
  },
});

export const {
  setCart,
  addToCart,
  changeQty,
  deleteCart,
  removeFromCart,
  plusCart,
  minusCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
