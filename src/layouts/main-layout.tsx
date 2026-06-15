import { Outlet } from 'react-router';

import BottomNavbar from '../components/navbar/bottom-navbar';
import { Toaster } from 'sonner';
import { Ban, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';

export default function MainLayout() {
  return (
    <>
      <main className='p-4 pb-20 min-h-[100dvh] w-full bg-background flex'>
        <Toaster
          icons={{
            close: <X />,
            error: <Ban />,
            info: <Info />,
            success: <CircleCheck />,
            warning: <TriangleAlert />
          }}
          closeButton
          hotkey={['esc']}
          position='top-right'
          richColors
          swipeDirections={['bottom', 'left', 'right']}
        />
        <Outlet />
        <BottomNavbar stickyBottom />
      </main>
    </>
  );
}
