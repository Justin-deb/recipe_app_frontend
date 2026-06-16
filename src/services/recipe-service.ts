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

export type GetRecipeByIdResponse = DataResponse<Recipe>;
export async function getRecipeById(
  id: string
): Promise<GetRecipeByIdResponse> {
  const res = await fetch(`${API_URL}/recipes/${id}`);
  if (!res.ok) {
    return {
      error: 'Ocurrio un error al cargar la receta',
      data: null
    };
  }

  if (res.ok && res.status === 404) {
    return {
      error: 'No se encontro la receta',
      data: null
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}
