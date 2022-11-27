import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../../utils/apiInstance';

export const getUserDataThunk = createAsyncThunk<
  { success: boolean; user: { email: string; name: string } },
  { cookie: string; url: Endpoint }
>('cabinet/getUserDataThunk', async ({ url, cookie }) => {
  const { data } = await apiInstance.get(url, {
    headers: { authorization: `Bearer ${cookie}` },
  });

  return data;
});

export const patchUserDataThunk = createAsyncThunk<
  { success: boolean; user: { email: string; name: string } },
  { body: object; cookie: string; url: Endpoint }
>('cabinet/patchUserDataThunk', async ({ url, cookie, body }) => {
  const { data } = await apiInstance.patch(url, body, {
    headers: { authorization: `Bearer ${cookie}` },
  });

  return data;
});
