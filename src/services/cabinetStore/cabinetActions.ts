import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from 'utils/apiInstance';
import type { UserData } from 'types/types';

export const getUserDataThunk = createAsyncThunk<
  UserData,
  { cookie: string; url: Endpoint }
>('cabinet/getUserDataThunk', async ({ url, cookie }) => {
  const { data } = await apiInstance.get(url, {
    headers: { authorization: `Bearer ${cookie}` },
  });

  return data;
});

export const patchUserDataThunk = createAsyncThunk<
  UserData,
  { body: object; cookie: string; url: Endpoint }
>('cabinet/patchUserDataThunk', async ({ url, cookie, body }) => {
  const { data } = await apiInstance.patch(url, body, {
    headers: { authorization: `Bearer ${cookie}` },
  });

  return data;
});
