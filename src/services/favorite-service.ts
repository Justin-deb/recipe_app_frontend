import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
import type { Recipe } from '../types/types';

export type GetFavoritesByUserResponse = DataResponse<
  Recipe[]
>;
export async function getFavoritesByUser(
  userId: string
): Promise<GetFavoritesByUserResponse> {
  const res = await fetch(
    `${API_URL}/favorites/recipe/${userId}`
  );

  if (!res.ok) {
    return {
      data: null,
      error: 'Error al cargar las recetas favoritas'
    };
  }

  return {
    data: await res.json(),
    error: null
  };
}

export type AddFavoriteResponse = DataResponse<Recipe>;
export async function AddFavorite(recipeId, userId) {
  const res = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipe_id: recipeId,
      user_id: userId
    })
  });

  if (!res.ok) {
    return {
      data: null,
      error: 'Error al agregar la receta a favoritos'
    };
  }

  return {
    data: await res.json(),
    error: null
  };
}

export type RemoveFavoriteResponse = DataResponse<Recipe>;
export async function RemoveFavorite(recipeId, userId) {
  const res = await fetch(`${API_URL}/favorites`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipe_id: recipeId,
      user_id: userId
    })
  });

  if (!res.ok) {
    return {
      data: null,
      error: 'Error al eliminar la receta de favoritos'
    };
  }

  return {
    data: await res.json(),
    error: null
  };
}
