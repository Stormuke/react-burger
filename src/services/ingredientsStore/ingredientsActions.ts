import { createAsyncThunk } from '@reduxjs/toolkit';
import { IngredientsData } from 'types/types';
import { apiInstance } from 'utils/apiInstance';

export const getIngredientsThunk = createAsyncThunk<IngredientsData, Endpoint>(
  'ingredients/getIngredients',
  async (endpoint) => {
    const { data } = await apiInstance.get(endpoint);

    return data;
  },
);

export const getUserDataThunk = createAsyncThunk<
  { success: boolean; user: { email: string; name: string } },
  { cookie: string; url: Endpoint }
>('ingredients/getUserData', async ({ url, cookie }) => {
  const { data } = await apiInstance.get(url, {
    headers: { authorization: `Bearer ${cookie}` },
  });

  return data;
});
