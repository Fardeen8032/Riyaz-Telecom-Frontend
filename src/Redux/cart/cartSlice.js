import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getCart,addCartItem,updateCartItem,removeCartItem,clearCart} from "../../Utils/api/Api";

const initialState = {
  userId: null,
  items: [],
  subtotal: 0,
  totalGst: 0,
  totalAmount: 0,
  status: "idle",
  error: "",
  actionStatus: "idle",
};

const getErrorMessage = (error) =>
  error?.response?.data?.message ??
  error?.message ??
  "Something went wrong. Please try again.";

const getAuthenticatedContext = (getState) => {
  const auth = getState()?.auth;
  const userId = auth?.user?._id ?? auth?.user?.id;
  const accessToken = auth?.accessToken;

  if (!userId || !accessToken) {
    throw new Error("Please log in to access your cart.");
  }

  return { userId, accessToken };
};

const getCartData = (response) => {
  const cart = response?.data ?? {};

  return {
    items: Array.isArray(cart?.items) ? cart.items : [],
    subtotal: Number(cart?.subtotal ?? 0),
    totalGst: Number(cart?.totalGst ?? 0),
    totalAmount: Number(cart?.totalAmount ?? 0),
  };
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const { userId, accessToken } = getAuthenticatedContext(getState);
      const response = await getCart(accessToken);

      if (response?.success === false) {
        return rejectWithValue(
          response?.message ?? "Unable to load your cart."
        );
      }

      return fulfillWithValue(getCartData(response), { userId });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error), {
        userId: getState()?.auth?.user?._id ?? getState()?.auth?.user?.id,
      });
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity = 1 }, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const { userId, accessToken } = getAuthenticatedContext(getState);

      if (!productId) {
        return rejectWithValue("A valid product is required.");
      }

      const response = await addCartItem(productId, quantity, accessToken);

      if (response?.success === false) {
        return rejectWithValue(
          response?.message ?? "Unable to add this product to your cart."
        );
      }

      return fulfillWithValue(getCartData(response), { userId });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error), {
        userId: getState()?.auth?.user?._id ?? getState()?.auth?.user?.id,
      });
    }
  }
);

export const changeCartItemQuantity = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const { userId, accessToken } = getAuthenticatedContext(getState);

      if (!productId || !Number.isInteger(quantity) || quantity < 1) {
        return rejectWithValue("Please select a valid quantity.");
      }

      const response = await updateCartItem(productId, quantity, accessToken);

      if (response?.success === false) {
        return rejectWithValue(
          response?.message ?? "Unable to update the product quantity."
        );
      }

      return fulfillWithValue(getCartData(response), { userId });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error), {
        userId: getState()?.auth?.user?._id ?? getState()?.auth?.user?.id,
      });
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/removeItem",
  async (productId, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const { userId, accessToken } = getAuthenticatedContext(getState);

      if (!productId) {
        return rejectWithValue("A valid product is required.");
      }

      const response = await removeCartItem(productId, accessToken);

      if (response?.success === false) {
        return rejectWithValue(
          response?.message ?? "Unable to remove the product."
        );
      }

      return fulfillWithValue(getCartData(response), { userId });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error), {
        userId: getState()?.auth?.user?._id ?? getState()?.auth?.user?.id,
      });
    }
  }
);

export const deleteAllCartItems = createAsyncThunk(
  "cart/clear",
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const { userId, accessToken } = getAuthenticatedContext(getState);
      const response = await clearCart(accessToken);

      if (response?.success === false) {
        return rejectWithValue(
          response?.message ?? "Unable to clear your cart."
        );
      }

      return fulfillWithValue(getCartData(response), { userId });
    } catch (error) {
      return rejectWithValue(getErrorMessage(error), {
        userId: getState()?.auth?.user?._id ?? getState()?.auth?.user?.id,
      });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      Object.assign(state, initialState);
    },

    setCartUser: (state, action) => {
      if (state.userId !== action.payload) {
        Object.assign(state, initialState);
        state.userId = action.payload ?? null;
      }
    },

    clearCartError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (state.userId !== action.meta.userId) return;

        Object.assign(state, action.payload);
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        if (
          action.meta.userId &&
          state.userId !== action.meta.userId
        ) return;

        state.status = "failed";
        state.error =
          action.payload ?? "Unable to load your cart.";
      })

      .addCase(addItemToCart.pending, (state) => {
        state.actionStatus = "loading";
        state.error = "";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        if (state.userId !== action.meta.userId) return;

        Object.assign(state, action.payload);
        state.actionStatus = "succeeded";
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        if (
          action.meta.userId &&
          state.userId !== action.meta.userId
        ) return;

        state.actionStatus = "failed";
        state.error = action.payload ?? "Unable to add the product.";
      })

      .addCase(changeCartItemQuantity.fulfilled, (state, action) => {
        if (state.userId !== action.meta.userId) return;

        Object.assign(state, action.payload);
        state.actionStatus = "succeeded";
      })
      .addCase(changeCartItemQuantity.rejected, (state, action) => {
        if (
          action.meta.userId &&
          state.userId !== action.meta.userId
        ) return;

        state.actionStatus = "failed";
        state.error = action.payload ?? "Unable to update quantity.";
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (state.userId !== action.meta.userId) return;

        Object.assign(state, action.payload);
        state.actionStatus = "succeeded";
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        if (
          action.meta.userId &&
          state.userId !== action.meta.userId
        ) return;

        state.actionStatus = "failed";
        state.error = action.payload ?? "Unable to remove the product.";
      })

      .addCase(deleteAllCartItems.fulfilled, (state, action) => {
        if (state.userId !== action.meta.userId) return;

        Object.assign(state, action.payload);
        state.actionStatus = "succeeded";
      })
      .addCase(deleteAllCartItems.rejected, (state, action) => {
        if (
          action.meta.userId &&
          state.userId !== action.meta.userId
        ) return;

        state.actionStatus = "failed";
        state.error = action.payload ?? "Unable to clear your cart.";
      });
  },
});

export const { resetCart, setCartUser, clearCartError } = cartSlice.actions;
export default cartSlice.reducer;