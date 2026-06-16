import { HeartIcon } from 'lucide-react';
import type { Recipe } from '../types/types';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';

interface RecipeProps {
  recipe: Recipe;
}
export function RecipeCard({ recipe }: RecipeProps) {
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate('/recetas/' + recipe.id, { viewTransition: true });
  };

  return (
    <div
      className='bg-card shadow-xl shadow-primary rounded'
      key={recipe.id}
    >
      <div
        onClick={navigateToDetail}
        className='relative'
      >
        {/* Flag image */}
        <img
          src={recipe?.country.flag_url}
          alt={`Recipe from ${recipe?.country.name}`}
          style={{ viewTransitionName: `recipe-flag-image-${recipe.id}` }}
          className='absolute top-2 left-2 z-10 rounded shadow-xl max-w-[50px]'
        />

        {/* Favorite button */}
        <Button
          className='absolute top-2 right-2 z-10 rounded shadow-xl'
          style={{ viewTransitionName: `recipe-favorite-button-${recipe.id}` }}
        >
          <HeartIcon />
          <span>Favorito</span>
        </Button>

        {/* Image */}
        <img
          src={recipe.photo_url}
          style={{ viewTransitionName: `recipe-image-${recipe.id}` }}
          className='w-full h-full max-h-[200px] object-cover rounded'
        />
      </div>

      <div className='px-4 pt-3 pb-4'>
        {/* Title */}
        <h1
          className='pb-0 text-xl font-bold text-primary'
          style={{ viewTransitionName: `recipe-name-${recipe.id}` }}
        >
          {recipe.name}
        </h1>

        {/* Rating */}
        <h3
          className='text-primary/60 text-xs pb-2'
          style={{ viewTransitionName: `recipe-description-${recipe.id}` }}
        >
          Los usuarios votaron: 5/10
        </h3>
        {/* Description */}
        <p className='text-card-foreground/50 leading-5 line-clamp-2 text-sm'>
          {recipe.description}
        </p>
        <div className='flex items-center justify-end pt-4 gap-2'>
          <Button
            className='rounded flex-1'
            size={'icon-lg'}
            onClick={navigateToDetail}
          >
            <span>Ver detalles</span>
          </Button>
          <Button
            size={'icon-lg'}
            variant={'outline'}
            className='rounded'
          >
            <HeartIcon
              size={44}
              className='text-foreground/70 w-full h-full'
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
