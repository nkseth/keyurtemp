import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: false,
  plans: [],
  addons: [],
};

const slice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getPlansSuccess(state, action) {
      state.isLoading = false;
      state.plans = action.payload;
    },

    getAddonsSuccess(state, action) {
      state.isLoading = false;
      state.addons = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// export const {
//     getCart,
//     addCart,
//     resetCart,
//     onGotoStep,
//     onBackStep,
//     onNextStep,
//     deleteCart,
//     deleteProduct,
//     createBilling,
//     applyShipping,
//     applyDiscount,
//     filterProducts,
//     sortByProducts,
//     increaseQuantity,
//     decreaseQuantity
//   } = slice.actions;

export function getPlans() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/plans");
      dispatch(slice.actions.getPlansSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAddons() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/addons");
      dispatch(slice.actions.getAddonsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
