import type { DataResponse } from '../types/data-response';
import { API_URL } from '../lib/constants';
import { type Comment, type User } from '../types/types';
import type { UserSession } from '../types/user-session';
export type GetCommentsByRecipeResponse = DataResponse<
  Comment[]
>;
export async function getCommentsByRecipe(
  recipeId: string
): Promise<GetCommentsByRecipeResponse> {
  const res = await fetch(
    `${API_URL}/comment/recipe/${recipeId}`
  );

  if (!res.ok) {
    return {
      error:
        (await res.json()) ||
        'Error al cargar los comentarios',
      data: null
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}

export type CreateCommentResponse = DataResponse<Comment>;
export async function CreateComment({
  title,
  description,
  recipeId,
  currentUserSession
}: {
  title: string;
  description: string;
  recipeId: string;
  currentUserSession: UserSession;
}): Promise<CreateCommentResponse> {
  const usersRes = await fetch(`${API_URL}/user`);
  if (!usersRes.ok) {
    return {
      data: null,
      error: 'Error al crear el comentario, inicia sesión'
    };
  }

  const users = await usersRes.json();

  const user = users.find(
    (user: User) => user.email === currentUserSession.email
  );
  if (!user) {
    return {
      data: null,
      error: 'Error al crear el comentario, inicia sesión'
    };
  }

  const res = await fetch(`${API_URL}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      recipeId,
      userId: user.id,
      username: user.username
    })
  });

  if (!res.ok) {
    return {
      error:
        (await res.json()) ||
        'Error al crear el comentario',
      data: null
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}

export type UpdateCommentResponse = DataResponse<Comment>;
export async function UpdateComment({
  commentId,
  title,
  description
}: {
  commentId: string;
  title: string;
  description: string;
}): Promise<UpdateCommentResponse> {
  const res = await fetch(`${API_URL}/comment/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description
    })
  });

  if (!res.ok) {
    return {
      error:
        (await res.json()) ||
        'Error al actualizar el comentario',
      data: null
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}
