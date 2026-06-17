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
            close: <X size={20} />,
            error: <Ban size={20} />,
            info: <Info size={20} />,
            success: <CircleCheck size={20} />,
            warning: <TriangleAlert size={20} />
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
