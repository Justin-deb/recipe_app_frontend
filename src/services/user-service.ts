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

  const allUsersRes = await fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!allUsersRes.ok) {
    const errorData = await allUsersRes.json();
    return {
      data: null,
      error: errorData || 'Error al obtener datos del usuario'
    };
  }

  const allUsersData = await allUsersRes.json();
  const userData: User = allUsersData.find(
    (user: User) => user.email === email
  );
  const resData: UserSession = await res.json();
  console.log('User Data:', userData);
  console.log('Response Data:', resData);
  console.log('All Users Data:', allUsersData);

  return {
    error: null,
    data: {
      avatar: userData.avatar,
      email: userData.email,
      last_session: resData.last_session,
      username: userData.username,
      id: userData.id || 0
    }
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
