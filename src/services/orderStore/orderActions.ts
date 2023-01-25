import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Order, OrderRequest } from 'types/types';
import { apiInstance } from 'utils/apiInstance';

export const postOrderThunk = createAsyncThunk<Order, OrderRequest>(
  'order/postOrder',
  async ({ endpoint, body, cookie }) => {
    const { data } = await apiInstance.post(endpoint, body, {
      headers: { authorization: `Bearer ${cookie}` },
    });

    return data;
  },
);
