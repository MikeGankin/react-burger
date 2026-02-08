import { BASE_URL } from '@utils/constants';

import type { TIngredient } from '@utils/types';

type TIngredientsApiResponse = {
  success: boolean;
  data: TIngredient[];
  message?: string;
};

export const checkResponse = async (res: Response): Promise<unknown> => {
  const data: unknown = await res.json();

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return data;
};

export const request = async (
  endpoint: string,
  options?: RequestInit
): Promise<unknown> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponse(response);
  } catch (errorData: unknown) {
    throw new Error(
      errorData instanceof Error ? errorData.message : 'Ошибка запроса к серверу'
    );
  }
};

export const getIngredients = async (): Promise<TIngredient[]> => {
  try {
    const response = (await request('/ingredients')) as TIngredientsApiResponse;

    if (!response.success) {
      throw new Error('Не удалось получить ингредиенты');
    }

    return response.data;
  } catch (errorData: unknown) {
    throw new Error(
      errorData instanceof Error ? errorData.message : 'Ошибка получения ингредиентов'
    );
  }
};
