import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@utils/constants';

import type { TIngredient } from '@utils/types';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

type TOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

type TOrderRequest = {
  ingredients: string[];
};

export const burgerApi = createApi({
  reducerPath: 'burgerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => '/ingredients',
      transformResponse: (response: TIngredientsResponse): TIngredient[] =>
        response.data,
    }),
    createOrder: builder.mutation<TOrderResponse, TOrderRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetIngredientsQuery } = burgerApi;
