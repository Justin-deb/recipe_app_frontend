import { HeartIcon } from 'lucide-react';
import type { Recipe } from '../types/types';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import noImage from '/no-image.jpg';
import { motion } from 'motion/react';

interface RecipeProps {
  recipe: Recipe;
}
export function RecipeCard({ recipe }: RecipeProps) {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState<string>(
    recipe.photoUrl || noImage
  );

  const navigateToDetail = () => {
    navigate('/recetas/' + recipe.id, {
      viewTransition: true,
      preventScrollReset: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='bg-card shadow-xl shadow-primary rounded min-h-[250px]'
      key={recipe.id}
    >
      <div className='relative'>
        {/* Flag container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute flex z-10 w-full justify-between p-2 h-14'
        >
          {/* Flag image */}
          <img
            src={recipe?.countryFlag}
            alt={`Recipe from ${recipe?.countryName}`}
            style={{
              viewTransitionName: `recipe-flag-image-${recipe.id}`
            }}
            className='rounded-full shadow-xl max-w-[40px] object-center object-cover'
          />
        </motion.div>

        {/* Image */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={navigateToDetail}
          src={imageURL}
          style={{
            viewTransitionName: `recipe-image-${recipe.id}`
          }}
          className='w-full h-full max-h-[200px] min-h-[200px] object-cover rounded'
          onError={() => setImageURL(noImage)}
        />
      </div>

      <div className='px-4 pt-3 pb-4 flex flex-col h-1/2'>
        {/* Title */}
        <h1
          className='pb-0 text-xl font-bold text-primary'
          style={{
            viewTransitionName: `recipe-name-${recipe.id}`
          }}
        >
          {recipe.name}
        </h1>

        {/* Rating */}
        <h3
          className='text-primary/60 text-xs pb-2'
          style={{
            viewTransitionName: `recipe-rating-${recipe.id}`
          }}
        >
          Los usuarios votaron: 5/10
        </h3>
        {/* Description */}
        <p
          className='text-card-foreground/50 leading-5 line-clamp-2 text-sm'
          style={{
            viewTransitionName: `recipe-description-${recipe.id}`
          }}
        >
          {recipe.description}
        </p>
        <div className='flex items-end justify-end pt-4 gap-2 flex-1 pb-2'>
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
    </motion.div>
  );
}
