import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import type { UserSession } from '../types/user-session';
import type { Recipe } from '../types/types';
import { getFavoritesByUser } from '../services/favorite-service';
import { RecipeCard } from '../components/recipe-card';
import { Spinner } from '../components/ui/spinner';

const Favorite = () => {
  const [user] = useLocalStorage<UserSession | null>('user_session');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFavorites = async () => {
      setIsLoading(true);
      const res = await getFavoritesByUser(user?.id || 3);
      if (res.error) {
        setError(res.error);
        setRecipes([] as Recipe[]);
        console.log('error');
      } else {
        setRecipes(res.data!);
        setError(null);
        console.log(res.data!);
      }
      setIsLoading(false);
    };
    getFavorites();
  }, []);

  return (
    <section className='gap-4 grid grid-cols-1 sm:gap-6 sm:grid lg:grid-cols-3 xl:grid-cols-4 min-h-[80dvh]'>
      {isLoading ?
        <div className='flex flex-1 justify-center items-center'>
          <Spinner className='self-center size-8' />
        </div>
      : error && !recipes ?
        <h1>Hubo un error: ${error}</h1>
      : recipes.length == 0 ?
        recipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            key={recipe.id}
          />
        ))
      : <h2 className='text-3xl'>No tienes recetas en favoritos</h2>}
    </section>
  );
};

export default Favorite;
