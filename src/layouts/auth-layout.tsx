import { Navigate, Outlet } from 'react-router';

export function PrivateLayout() {
  // TODO: Reemplaza esto con tu lógica real de autenticación (ej: const { user } = useAuth();)
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  if (!isAuthenticated) {
    // Si no está logueado, lo mandamos al login
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  // Si está logueado, renderiza las rutas hijas
  return <Outlet />;
}

export function PublicOnlyLayout() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  if (isAuthenticated) {
    // Si ya inició sesión, no tiene sentido que vea el login, lo mandamos al home
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return <Outlet />;
}
