import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
import type { Ingredient } from '../types/types';

export type GetIngredientsResponse = DataResponse<
  Ingredient[]
>;
export async function getIngredients(): Promise<GetIngredientsResponse> {
  const res = await fetch(`${API_URL}/ingredient`);

  if (!res.ok) {
    return {
      error: 'No se pudieron cargar los ingredientes',
      data: null
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}
