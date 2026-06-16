import { useEffect, useState } from 'react';
import type { Recipe } from '../types/types';
import { getRecipes } from '../services/recipe-service';
import { RecipeCard } from '../components/recipe-card';

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
      <section className='flex flex-col gap-4 '>
        {isLoading ?
          <h1>Cargando...</h1>
        : error && !recipes ?
          <h1>Hubo un error: ${error}</h1>
        : recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.name}
            />
          ))
        }
      </section>
    </main>
  );
}
