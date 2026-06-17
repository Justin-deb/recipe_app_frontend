import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
import type { Recipe } from '../types/types';

export type GetRecipesResponse = DataResponse<Recipe[]>;

export async function getRecipes(): Promise<GetRecipesResponse> {
  const res = await fetch(`${API_URL}/recipe`);
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    return {
      error: 'Error fetching recipes',
      data: null
    };
  }

  return {
    error: null,
    data: data
  };
}

export type GetRecipeByIdResponse = DataResponse<Recipe>;
export async function getRecipeById(
  id: string
): Promise<GetRecipeByIdResponse> {
  const res = await fetch(`${API_URL}/recipe/${id}`);
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

export type CreateRecipeResponse = DataResponse<Recipe>;
export async function CreateRecipe({
  name,
  description,
  photoUrl,
  countryId,
  ingredients
}: {
  name: string;
  description: string;
  photoUrl: string;
  countryId: string;
  ingredients: string[];
}): Promise<CreateRecipeResponse> {
  const res = await fetch(`${API_URL}/recipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      description,
      photoUrl,
      countryId,
      ingredients
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    return {
      data: null,
      error: errorData.message || 'Error al crear la receta'
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}
