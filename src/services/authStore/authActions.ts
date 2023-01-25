import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from 'utils/apiInstance';
import { AuthRequest, AuthResponse } from 'types/types';

export const postAuthFormThunk = createAsyncThunk<AuthResponse, AuthRequest>(
  'auth/postAuthFormThunk',
  async ({ endpoint, body }) => {
    const { data } = await apiInstance.post(endpoint, body);

    return data;
  },
);
