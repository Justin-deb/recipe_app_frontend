import { useLocalStorage } from '@uidotdev/usehooks';
import { Navigate, Outlet } from 'react-router';
import type { UserSession } from '../types/user-session';

export function PrivateLayout() {
  const [user] = useLocalStorage<UserSession | null>('user_session');
  const isAuthenticated = user?.last_session;

  if (!isAuthenticated) {
    // si no esta logueado lo mandamos al login
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  // si si entonces lo manda a la ruta hija
  return <Outlet />;
}

export function PublicOnlyLayout() {
  const [user] = useLocalStorage<UserSession | null>('user_session');
  const isAuthenticated = user?.last_session;

  if (isAuthenticated) {
    // si ya inicio sesion no tiene sentido que vea el login entonces lo mandamos al home
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return <Outlet />;
}
