import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import cartReducer from './cart';
import logger from 'redux-logger';

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
