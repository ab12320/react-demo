import { createSlice } from '@reduxjs/toolkit';

// accepts an object of reducer functions, a slice name,
// and an initial state value, and automatically generates a
// slice reducer with corresponding action creators and action types.
export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState: {
    text: null,
    isHidden: true,
  },
  reducers: {
    showSpinner: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.text = action.payload.text;
      state.isHidden = false;
    },
    hideSpinner: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.text = null;
      state.isHidden = true;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSpinner = state => state.spinner;

export default spinnerSlice.reducer;
