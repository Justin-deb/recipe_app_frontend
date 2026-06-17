import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
import type { User } from '../types/types';
import type { UserSession } from '../types/user-session';

export type LoginResponse = DataResponse<UserSession>;
export async function Login({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  if (!email || !password)
    return { data: null, error: 'Se requieren email y contraseña' };

  const res = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const errorData = await res.json();
    return {
      data: null,
      error: errorData || 'Error al iniciar sesión'
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}

export type RegisterResponse = DataResponse<User | null>;
export async function Register({
  username,
  email,
  password
}: {
  username: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  if (!email || !password || !username) {
    return {
      data: null,
      error: 'Se requieren email, contraseña y nombre de usuario'
    };
  }

  const res = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password,
      avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${username}`
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    return {
      data: null,
      error: errorData.error || 'Error al registrarse'
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}
