import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('GET_USERS', () => {
  return axios.get('/api/admin').then(r => r.data);
});

export const upgradeUser = createAsyncThunk('UPGRADE_USER', userId => {
  return axios.put(`/api/admin/${userId}`, { isAdmin: true }).then(r => r.data);
});

export const downgradeUser = createAsyncThunk('DOWNGRADE_USER', userId => {
  return axios
    .put(`/api/admin/${userId}`, { isAdmin: false })
    .then(r => r.data);
});

const adminReducer = createReducer([], {
  [getUsers.fulfilled]: (state, action) => action.payload,
  [upgradeUser.fulfilled]: (state, action) => {
    state.forEach(user => {
      if (user.id === action.payload.id) user.isAdmin = true;
    });
  },
  [downgradeUser.fulfilled]: (state, action) => {
    state.forEach(user => {
      if (user.id === action.payload.id) user.isAdmin = false;
    });
  },
});

export default adminReducer;
