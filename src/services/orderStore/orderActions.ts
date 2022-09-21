import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from 'types/types';
import { apiInstance } from 'utils/apiInstance';

export const postOrderThunk = createAsyncThunk<
  Order,
  { body: object; endpoint: Endpoint }
>('order/postOrder', async ({ endpoint, body }) => {
  const { data } = await apiInstance.post(endpoint, body);

  return data;
});
