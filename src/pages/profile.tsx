import { useLocalStorage } from '@uidotdev/usehooks';
import type { UserSession } from '../types/user-session';
import { Button } from '../components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [user, setUser] = useLocalStorage<UserSession | null>('user_session');

  const handleLogout = () => {
    setUser(null);
    toast.info('Cerraste sesión');
  };

  return (
    <>
      <div className='bg-card w-full max-h-[400px] rounded shadow-lg flex flex-col'>
        {/* Image container */}
        <div className='bg-accent rounded relative h-4/4 shadow'>
          {/* Image */}
          <img
            src={user?.avatar}
            alt={user?.username}
            className='w-[200px] border-8 shadow border-accent rounded-full absolute top-1/8 left-1/2 -translate-x-1/2'
          />
        </div>

        {/* Profile container */}
        <div className='p-4 pt-12 flex flex-col h-full'>
          {/* Profile info */}
          <div className='flex flex-col flex-1'>
            <h1 className='w-full text-center font-extrabold text-2xl text-primary text-shadow-2xs text-shadow-accent'>
              {user?.username}
            </h1>
            <h2 className='w-full text-center text-accent-foreground/40 text-sm p-1'>
              {user?.email}
            </h2>
          </div>

          {/* Logout button */}
          <Button
            className='rounded w-full'
            variant={'destructive'}
            size={'lg'}
            onClick={() => handleLogout()}
          >
            <span>Cerrar sesión</span>
            <LogOutIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
