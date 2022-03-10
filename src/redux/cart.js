import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCart = createAsyncThunk('GET_CART', () => {
  return axios.get('/api/cart').then(r => r.data);
});

export const addToCart = createAsyncThunk('ADD_TO_CART', product => {
  return axios.post('/api/cart', product).then(r => r.data);
});

export const removeFromCart = createAsyncThunk(
  'REMOVE_FROM_CART',
  productId => {
    return axios.delete(`/api/cart/${productId}`).then(r => r.data);
  }
);

export const emptyCart = createAsyncThunk('EMPTY_CART', () => {
  return axios.delete('/api/cart').then(r => r.data);
});

const cartReducer = createReducer([], {
  [getCart.fulfilled]: (state, action) => action.payload,
  [addToCart.fulfilled]: (state, action) => action.payload,
  [removeFromCart.fulfilled]: (state, action) => action.payload,
  [emptyCart.fulfilled]: (state, action) => [],
});

export default cartReducer;
