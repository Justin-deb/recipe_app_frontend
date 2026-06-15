import { API_URL } from '../lib/constants';
import type { DataResponse } from '../types/data-response';
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

  const res = await fetch(`${API_URL}/login`, {
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
      error: errorData.message || 'Error al iniciar sesión'
    };
  }

  return {
    error: null,
    data: await res.json()
  };
}
