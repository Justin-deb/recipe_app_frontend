import { HeartIcon } from 'lucide-react';
import type { Recipe } from '../types/types';
import { Button } from './ui/button';
import { NavLink, useNavigate } from 'react-router';

interface RecipeProps {
  recipe: Recipe;
}
export function RecipeCard({ recipe }: RecipeProps) {
  const navigate = useNavigate();
  return (
    <div
      className='bg-card shadow-xl shadow-primary rounded'
      key={recipe.id}
    >
      <div>
        {/* Image */}
        <NavLink
          to={`/recipe/${recipe.id}`}
          viewTransition
        >
          {({ isTransitioning }) => (
            <img
              src={recipe.photo_url}
              style={{
                viewTransitionName: `recipe-img-${recipe.id}`
              }}
              className='w-full max-h-[200px] object-cover rounded'
            />
          )}
        </NavLink>
      </div>

      <div className='px-4 pt-3 pb-4'>
        {/* Title */}
        <h1 className='pb-0 text-xl font-bold text-primary'>{recipe.name}</h1>

        {/* Rating */}
        <h3 className='text-primary/60 text-xs pb-2'>
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
            onClick={() =>
              navigate('/recetas/' + recipe.id, { viewTransition: true })
            }
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
