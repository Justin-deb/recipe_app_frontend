import { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import type { Recipe } from '../types/types';
import { getRecipes } from '../services/recipe-service';
import { Spinner } from '../components/ui/spinner';
import { RecipeCard } from '../components/recipe-card';
import { AnimatePresence, motion } from 'motion/react';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(
    [] as Recipe[]
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

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
  return (
    <div className='w-full min-h-dvh'>
      <h1 className='text-xl font-extrabold text-primary'>
        Buscar una receta
      </h1>
      <p className='leading-4.5 text-foreground/50 text-sm font-light pb-2'>
        Busca con pais, nombre o ingredientes. Encuentra
        justo lo que quieres cocinar para tu disfrute
      </p>
      <Input
        className='w-full bg-secondary placeholder:text-secondary-foreground/40 border-border shadow rounded mt-1 text-secondary-foreground p-4 focus:border-primary'
        inputMode='text'
        placeholder='Fideos con pollo...'
        autoFocus
        onChange={(e) => setSearch(e.target.value)}
      />
      <AnimatePresence
        presenceAffectsLayout
        mode='popLayout'
      >
        <section className='gap-4 grid grid-cols-1 sm:gap-6 sm:grid lg:grid-cols-3 xl:grid-cols-4 min-h-[80dvh]'>
          {isLoading ?
            <motion.div className='flex flex-1 justify-center items-center'>
              <Spinner className='self-center size-8' />
            </motion.div>
          : error && !recipes ?
            <h1>Hubo un error: ${error}</h1>
          : recipes
              .filter((recipe) =>
                recipe.name.toLowerCase().includes(search)
              )
              .map((recipe) => (
                <RecipeCard
                  recipe={recipe}
                  key={recipe.id}
                />
              ))
          }
        </section>
      </AnimatePresence>
    </div>
  );
}
