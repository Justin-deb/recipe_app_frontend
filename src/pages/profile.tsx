import { useLocalStorage } from '@uidotdev/usehooks';
import type { UserSession } from '../types/user-session';
import { Button } from '../components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import type { Recipe, RecipeFavorite } from '../types/types';
import { deleteRecipe, getRecipesByUser } from '../services/recipe-service';
import { RecipeCard } from '../components/recipe-card';

export default function ProfilePage() {
  const [user, setUser] = useLocalStorage<UserSession | null>('user_session');
  const [, setFavorites] = useLocalStorage<RecipeFavorite[]>('favorites');
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([] as Recipe[]);
  const [, setIsLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
    toast.info('Cerraste sesión');
  };

  useEffect(() => {
    const fetchMyRecipes = async () => {
      if (!user) return;
      setIsLoading(true);
      const res = await getRecipesByUser(user.id);

      if (res.error) {
        toast.error('No se pudieron cargar tus recetas');
      }
      setMyRecipes(res.data || []);
      setIsLoading(false);
    };
    fetchMyRecipes();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await deleteRecipe(id);
    if (res.error) {
      toast.error('Error al eliminar la receta');
    } else {
      setMyRecipes((prev) => prev.filter((r) => r.id !== id));
      toast.success('Receta eliminada');
    }
  };

  return (
    <>
      <div className='min-h-full w-full rounded shadow-lg flex flex-col gap-4'>
        <div className='bg-card flex flex-col min-h-[400px]'>
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
        <h1 className='text-2xl font-extrabold text-secondary'>Mis recetas</h1>
        <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-4'>
          {myRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}
