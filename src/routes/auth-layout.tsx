import { Outlet } from 'react-router';

export function AuthLayout() {
  console.log('pasando por el auth layout');
  return <>{Outlet}</>;
}
