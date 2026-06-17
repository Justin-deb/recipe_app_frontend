import { useEffect, useState } from 'react';
import type { Recipe } from '../types/types';
import { getRecipes } from '../services/recipe-service';
import { RecipeCard } from '../components/recipe-card';
import { Spinner } from '../components/ui/spinner';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([] as Recipe[]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const res = await getRecipes();
      if (res.error) {
        setError(res.error);
        setRecipes([] as Recipe[]);
      } else {
        setRecipes(res.data!);
        setError(null);
      }
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <main>
      <div className='pb-6'>
        <h1 className='pb-1 text-2xl font-extrabold text-primary'>
          Recetas destacadas
        </h1>
        <p className='leading-4.5 text-foreground/50 text-sm font-light'>
          Descubre las recetas mas votadas por los usuarios y encuentra nuevas
          formas de disfrutar de lo que mas te gusta en la cocina!
        </p>
      </div>
      <section className='gap-4 grid grid-cols-1 sm:gap-6 sm:grid lg:grid-cols-3 xl:grid-cols-4 min-h-[80dvh]'>
        {isLoading ?
          <div className='flex flex-1 justify-center items-center'>
            <Spinner className='self-center size-8' />
          </div>
        : error && !recipes ?
          <h1>Hubo un error: ${error}</h1>
        : recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
            />
          ))
        }
      </section>
    </main>
  );
}
