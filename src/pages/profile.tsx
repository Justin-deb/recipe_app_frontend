import { useLocalStorage } from '@uidotdev/usehooks';
import type { UserSession } from '../types/user-session';
import { Button } from '../components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import type { Recipe } from '../types/types';
import { getRecipes, deleteRecipe } from '../services/recipe-service';
import { RecipeCard } from '../components/recipe-card';

export default function ProfilePage() {
  const [user, setUser] = useLocalStorage<UserSession | null>('user_session');
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([] as Recipe[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setUser(null);
    toast.info('Cerraste sesión');
  };

  useEffect(() => {
    const fetchMyRecipes = async () => {
      if (!user) return;
      setIsLoading(true);
      const res = await getRecipes();
      if (!res.error && res.data) {
        const mine = res.data.filter(
          (r) => String(r.userId) === String(user.userId)
        );
        setMyRecipes(mine);
      } else {
        setMyRecipes([]);
      }
      setIsLoading(false);
    };
    fetchMyRecipes();
  }, [user]);

  const handleDelete = async (id: number) => {
    try {
      await deleteRecipe(id);
      setMyRecipes((prev) => prev.filter((r) => r.id !== id));
      toast.success('Receta eliminada');
    } catch (err) {
      toast.error('Error al eliminar la receta');
    }
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
