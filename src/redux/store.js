import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './admin';
import userReducer from './user';
import cartReducer from './cart';
import logger from 'redux-logger';

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    admin: adminReducer,
    cart: cartReducer,
  },
});

export default store;
