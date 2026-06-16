import { useNavigate, useParams } from 'react-router';
import type { Recipe } from '../types/types';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../services/recipe-service';
import { Button } from '../components/ui/button';
import { ArrowLeftIcon, HeartIcon } from 'lucide-react';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setRecipe(null);
        return;
      }
      const res = await getRecipeById(id!);
      setRecipe(res.error ? null : res.data);
    };
    fetchRecipe();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1, { viewTransition: true });
  };

  return (
    <div>
      <Button
        onClick={handleGoBack}
        variant={'link'}
        className={'rounded ps-0 pe-6 py-6'}
      >
        <ArrowLeftIcon />
        <span>Volver</span>
      </Button>
      {/* Image container */}
      <div className='w-full max-h-[300px] relative'>
        {/* Flag image */}
        <img
          src={recipe?.country.flag_url}
          alt={`Recipe from ${recipe?.country.name}`}
          style={{ viewTransitionName: `recipe-flag-image-${id}` }}
          className='absolute top-2 left-2 z-10 rounded shadow-xl max-w-[50px]'
        />

        {/* Favorite button */}
        <Button
          className='absolute top-2 right-2 z-10 rounded shadow-xl'
          style={{ viewTransitionName: `recipe-favorite-button-${id}` }}
        >
          <HeartIcon />
          <span>Favorito</span>
        </Button>

        {/* Dish image */}
        <img
          className='w-full h-full object-cover rounded'
          src={recipe?.photo_url}
          style={{ viewTransitionName: `recipe-image-${id}` }}
        />
      </div>
      <h1
        style={{ viewTransitionName: `recipe-name-${id}` }}
        className='p-3 rounded mt-2 text-2xl font-bold text-primary-foreground bg-primary
        flex items-center justify-center'
      >
        {recipe?.name}
      </h1>

      {/* Favorites and country */}
      <div className='flex p-2 justify-between'>
        <h3
          className='opacity-40 text-sm pb-2 text-center'
          style={{ viewTransitionName: `recipe-favorites-${id}` }}
        >
          Guardado 24 veces
        </h3>
        <h3
          className='text-primary/80 text-sm pb-2 text-center underline'
          style={{ viewTransitionName: `recipe-author-${id}` }}
        >
          {recipe?.author && `Subido por ${recipe?.author.username}`}
        </h3>
      </div>
    </div>
  );
}
