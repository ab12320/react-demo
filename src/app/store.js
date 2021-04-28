import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import accountReducer from '../features/account/accountSlice';
import alertReducer from '../features/alert/alertSlice';
import spinnerReducer from '../features/spinner/spinnerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer,
    alert: alertReducer,
    spinner: spinnerReducer,
  },
});
