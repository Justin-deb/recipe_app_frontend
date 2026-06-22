import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import type { UserSession } from '../types/user-session';
import type { RecipeFavorite } from '../types/types';
import { getFavoritesByUser } from '../services/favorite-service';
import { RecipeCard } from '../components/recipe-card';
import { Spinner } from '../components/ui/spinner';

const Favorite = () => {
  const [user] = useLocalStorage<UserSession>('user_session');
  const [favorites, setFavorites] = useState<RecipeFavorite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [, setLocalFavorites] = useLocalStorage<RecipeFavorite[]>('favorites');

  useEffect(() => {
    const getFavorites = async () => {
      setIsLoading(true);
      const res = await getFavoritesByUser(user.id);
      if (res.error) {
        setError(res.error);
        setFavorites([] as RecipeFavorite[]);
        console.log('error');
      } else {
        setFavorites(res.data!);
        setLocalFavorites(res.data!);
        setError(null);
        console.log(res.data!);
      }
      setIsLoading(false);
    };
    getFavorites();
  }, [user.id]);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <section className='gap-4 grid grid-cols-1 sm:gap-6 sm:grid lg:grid-cols-3 xl:grid-cols-4 min-h-[80dvh] w-full'>
      {isLoading ?
        <div className='flex flex-1 justify-center items-center'>
          <Spinner className='self-center size-8' />
        </div>
      : error ?
        <h1>Hubo un error: ${error}</h1>
      : favorites.length > 0 ?
        favorites.map((favorite) => (
          <RecipeCard
            recipe={favorite.recipe}
            key={favorite.recipeId}
          />
        ))
      : <h2 className='text-3xl self-center place-self-center w-full max-w-[250px] text-center'>
          No tienes recetas en favoritos
        </h2>
      }
    </section>
  );
};

export default Favorite;
