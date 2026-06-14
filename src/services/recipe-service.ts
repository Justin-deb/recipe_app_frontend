import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
import type { Recipe } from '../types/types';

export type GetRecipesResponse = DataResponse<Recipe[]>;

export async function getRecipes(): Promise<GetRecipesResponse> {
  const res = await fetch(`${API_URL}/recipes`);

  if (!res.ok) {
    return {
      error: 'Error fetching recipes',
      data: null
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}
