import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from 'utils/apiInstance';
import { AuthResponse } from 'types/types';

export const postAuthFormThunk = createAsyncThunk<
  AuthResponse,
  { body: Record<string, string>; endpoint: Endpoint }
>('auth', async ({ endpoint, body }) => {
  const { data } = await apiInstance.post(endpoint, body);

  return data;
});
