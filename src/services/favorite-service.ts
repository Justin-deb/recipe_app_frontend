import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
import type { Recipe, RecipeFavorite, User } from '../types/types';
import type { UserSession } from '../types/user-session';

export type GetFavoritesByUserResponse = DataResponse<RecipeFavorite[]>;
export async function getFavoritesByUser(
  userId: number
): Promise<GetFavoritesByUserResponse> {
  const res = await fetch(`${API_URL}/favorite/user/${userId}`);

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
export async function AddFavorite(recipeId: number, user_session: UserSession) {
  console.log(user_session);
  if (!user_session) {
    return {
      data: null,
      error: 'Usuario no autenticado'
    };
  }

  const usersRes = await fetch(`${API_URL}/user`);
  if (!usersRes.ok) {
    return {
      data: null,
      error: 'Error al crear la receta'
    };
  }

  const users: User[] = await usersRes.json();
  const currentUser: User | undefined = users.find(
    (user: User) => user_session.email === user.email
  );

  const res = await fetch(`${API_URL}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipeId,
      userId: currentUser?.id
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
export async function RemoveFavorite(recipeId: number, userId: number) {
  const res = await fetch(`${API_URL}/favorite/${userId}/${recipeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
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
