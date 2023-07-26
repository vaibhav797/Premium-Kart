import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartByUser,
  updateCart,
  deleteItem,
  resetCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
  cartLoaded: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({newProduct, alert}) => {
    const response = await addToCart(newProduct);
    alert.success("Item added to cart");
    return response.data;
  }
);

export const fetchCartByUserAsync = createAsyncThunk(
  "cart/fetchCartByUser",
  async () => {
    const response = await fetchCartByUser();
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (user) => {
    const response = await updateCart(user);
    return response.data;
  }
);

export const deleteItemAsync = createAsyncThunk(
  "cart/deleteItem",
  async (itemId) => {
    const response = await deleteItem(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchCartByUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (id) => id.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (id) => id.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { clearCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
