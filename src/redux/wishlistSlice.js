
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],

  reducers: {
    setWishlist: (state, action) => {
      return action.payload;
    },

    like: (state, action) => {
      const product = state.find(
        (item) => item.id === action.payload.id
      );

      if (!product) {
        state.push(action.payload);
      }
    },

    toggleWish: (state, action) => {
      const product = state.find(
        (item) => item.id === action.payload.id
      );

      if (product) {
        return state.filter(
          (item) => item.id !== action.payload.id
        );
      }

      state.push(action.payload);
    },

    deleteLike: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setWishlist,
  like,
  toggleWish,
  deleteLike,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
