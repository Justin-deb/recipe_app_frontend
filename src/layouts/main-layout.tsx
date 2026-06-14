import { Outlet } from 'react-router';

import BottomNavbar from '../components/navbar/bottom-navbar';

export default function MainLayout() {
  return (
    <>
      <main className='p-4 pb-20 bg-background'>
        <Outlet />
        <BottomNavbar stickyBottom />
      </main>
    </>
  );
}
