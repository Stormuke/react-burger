import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from 'types/types';
import { apiInstance } from 'utils/apiInstance';

export const postOrderThunk = createAsyncThunk<
  Order,
  { body: object; cookie: string; endpoint: Endpoint }
>('order/postOrder', async ({ endpoint, body, cookie }) => {
  const { data } = await apiInstance.post(endpoint, body, {
    headers: { authorization: `Bearer ${cookie}` },
  });

  return data;
});
