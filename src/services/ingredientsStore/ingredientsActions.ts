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
