import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
import type { Recipe, User } from '../types/types';
import type { UserSession } from '../types/user-session';
import { getCommentsByRecipe } from './comment-service';

export type GetRecipesResponse = DataResponse<Recipe[]>;

export async function getRecipes(): Promise<GetRecipesResponse> {
  const res = await fetch(`${API_URL}/recipe`);
  const data = await res.json();

  if (!res.ok) {
    return {
      error: 'Error fetching recipes',
      data: null
    };
  }

  return {
    error: null,
    data
  };
}

export const deleteRecipe = async (id: number) => {
  const response = await fetch(`${API_URL}/recipe/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    return {
      error: 'Ocurrio un error al eliminar la receta',
      data: null
    };
  }
};

export type GetRecipeByIdResponse = DataResponse<Recipe>;
export async function getRecipeById(
  id: string
): Promise<GetRecipeByIdResponse> {
  const res = await fetch(`${API_URL}/recipe/${id}`);

  if (res.status === 404) {
    return {
      error: 'No se encontro la receta',
      data: null
    };
  }

  if (!res.ok) {
    return {
      error: 'Ocurrio un error al cargar la receta',
      data: null
    };
  }

  let recipe: Recipe = await res.json();

  const comments = await getCommentsByRecipe(
    recipe.id.toString()
  );
  if (!comments.error) {
    recipe = { ...recipe, comments: comments.data! };
  }
  return {
    error: null,
    data: recipe
  };
}

export type CreateRecipeResponse = DataResponse<Recipe>;
export async function CreateRecipe({
  name,
  description,
  photoUrl,
  countryId,
  ingredients,
  currentUserSession
}: {
  name: string;
  description: string;
  photoUrl: string;
  countryId: string;
  ingredients: string[];
  currentUserSession: UserSession;
}): Promise<CreateRecipeResponse> {
  if (!currentUserSession) {
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
    (user: User) => currentUserSession.email === user.email
  );

  if (!currentUser) {
    return {
      data: null,
      error: 'Error al crear la receta'
    };
  }

  const res = await fetch(`${API_URL}/recipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      description,
      photoUrl,
      countryId,
      ingredients,
      userId: currentUser.id
    })
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      data: null,
      error: data.message || 'Error al crear la receta'
    };
  }

  return {
    error: null,
    data
  };

  
}
