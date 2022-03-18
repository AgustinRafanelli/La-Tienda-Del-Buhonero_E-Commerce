import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendRegisterRequest = createAsyncThunk('REGISTER', user => {
  return axios
    .post('/api/users/register', user)
    .then(() => axios.post('/api/users/login', user))
    .then(r => r.data);
});

export const sendLogInRequest = createAsyncThunk('LOGIN', user => {
  return axios.post('/api/users/login', user).then(r => r.data);
});

export const sendLogOutRequest = createAsyncThunk('LOGOUT', () => {
  return axios.post('/api/users/logout');
});

export const updateUser = createAsyncThunk('UPDATE_USER', data => {
  return axios.put('/api/users/update', data).then(r => r.data);
});

export const getUser = createAsyncThunk('GET_USER', () => {
  return axios.get('/api/users/me').then(r => r.data);
});

const userReducer = createReducer(
  {},
  {
    [sendRegisterRequest.fulfilled]: (state, action) => action.payload,
    [sendRegisterRequest.rejected]: (state, action) => { alert('Invalid credentials') },
    [sendLogInRequest.fulfilled]: (state, action) => action.payload,
    [sendLogInRequest.rejected]: (state, action) => { alert('Wrong credentials') },
    [sendLogOutRequest.fulfilled]: (state, action) => { return {} },
    [updateUser.fulfilled]: (state, action) => action.payload,
    [getUser.fulfilled]: (state, action) => action.payload,
  }
);

export default userReducer;
