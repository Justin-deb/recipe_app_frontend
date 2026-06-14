import { useEffect, useState } from 'react';
import type { Recipe } from '../types/types';
import type { DataResponse } from '../types/data-response';
import { getRecipes } from '../services/recipe-service';
import { HeartIcon } from 'lucide-react';
import { Button } from '../components/ui/button';

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
            <div
              className='bg-card shadow-lg rounded'
              key={recipe.id}
            >
              <div>
                {/* Image */}
                <img
                  src={recipe.photo_url}
                  alt=''
                  className='w-full rounded'
                />
              </div>

              <div className='px-4 pt-3 pb-4'>
                {/* Title */}
                <h1 className='pb-0 text-xl font-bold text-primary'>
                  {recipe.name}
                </h1>

                {/* Rating */}
                <h3 className='text-primary/60 text-xs pb-2'>
                  Los usuarios votaron: 5/10
                </h3>
                {/* Description */}
                <p className='text-card-foreground/50 leading-5 line-clamp-2 text-sm'>
                  {recipe.description}
                </p>
                <div className='flex items-center justify-end pt-4 gap-2'>
                  <Button className='rounded flex-1'>
                    <span>Ver detalles</span>
                  </Button>
                  <Button
                    variant={'outline'}
                    className='rounded'
                  >
                    <span>Guardar</span>
                    <HeartIcon
                      size={44}
                      className='text-foreground/70'
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </main>
  );
}
