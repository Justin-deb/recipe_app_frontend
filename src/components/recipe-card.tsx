import { HeartIcon, Trash2, XIcon } from 'lucide-react';
import type { Recipe, RecipeFavorite } from '../types/types';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import noImage from '/no-image.jpg';
import { motion } from 'motion/react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { AddFavorite, RemoveFavorite } from '../services/favorite-service';
import { toast } from 'sonner';
import type { UserSession } from '../types/user-session';
import { cn } from '../lib/utils';

interface RecipeProps {
  recipe: Recipe;
  onDelete?: (id: number) => void;
}

export function RecipeCard({ recipe, onDelete }: RecipeProps) {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState<string>(recipe.photoUrl || noImage);
  const [favorites, setFavorites] =
    useLocalStorage<RecipeFavorite[]>('favorites');
  const [user] = useLocalStorage<UserSession>('user_session');

  const isFavorite = favorites?.some((f) => f.recipeId === recipe.id);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
      setFavorites(favorites.filter((f) => f.recipeId !== recipe.id));
      const res = await RemoveFavorite(recipe.id, user.id);
      if (res.error) {
        setFavorites([
          ...favorites,
          {
            createdAt: Date.now().toString(),
            recipe: recipe,
            recipeId: recipe.id
          }
        ]);
        toast.error('No se pudo quitar de favoritos');
      } else {
        toast.info('Receta eliminada de favoritos');
      }
    } else {
      setFavorites([
        ...favorites,
        {
          createdAt: Date.now().toString(),
          recipe: recipe,
          recipeId: recipe.id
        }
      ]);
      const res = await AddFavorite(recipe.id, user!);
      if (res.error) {
        setFavorites(favorites?.filter((f) => f.recipeId !== recipe.id));
        toast.error(res.error);
      } else {
        toast.info('Receta agregada a favoritos');
      }
    }
  };

  const navigateToDetail = () => {
    navigate('/recetas/' + recipe.id, { viewTransition: true });
  };

  useEffect(() => {
    console.log('this is the favorit shi' + isFavorite);
  }, [isFavorite]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='bg-card shadow-xl shadow-primary rounded min-h-[250px] max-h-[380px]'
      key={recipe.id}
    >
      <div className='relative'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute flex z-10 w-full justify-between p-2 h-14'
        >
          <img
            src={recipe?.countryFlag}
            alt={`Recipe from ${recipe?.countryName}`}
            style={{ viewTransitionName: `recipe-flag-image-${recipe.id}` }}
            className='rounded-full shadow-xl max-w-[40px] object-center object-cover'
          />
        </motion.div>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={navigateToDetail}
          src={imageURL}
          style={{ viewTransitionName: `recipe-image-${recipe.id}` }}
          className='w-full h-full max-h-[200px] min-h-[200px] object-cover rounded'
          onError={() => setImageURL(noImage)}
        />
      </div>

      <div className='px-4 pt-3 pb-4 flex flex-col h-1/2'>
        <h1
          className='pb-0 text-xl font-bold text-primary'
          style={{ viewTransitionName: `recipe-name-${recipe.id}` }}
        >
          {recipe.name}
        </h1>
        <h3
          className='text-primary/60 text-xs pb-2'
          style={{ viewTransitionName: `recipe-rating-${recipe.id}` }}
        >
          Los usuarios votaron: 5/10
        </h3>
        <p
          className='text-card-foreground/50 leading-5 line-clamp-2 text-sm'
          style={{ viewTransitionName: `recipe-description-${recipe.id}` }}
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

          {onDelete ?
            <Button
              size={'icon-lg'}
              variant={'destructive'}
              className='rounded'
              onClick={() => {
                const ok = confirm(
                  '¿Eliminar esta receta? Esta acción no se puede deshacer.'
                );
                if (ok) onDelete(recipe.id);
              }}
            >
              <Trash2
                size={28}
                className='text-foreground/70 w-full h-full'
              />
            </Button>
          : <Button
              size={'icon-lg'}
              variant={isFavorite ? 'destructive' : 'outline'}
              className={cn('rounded')}
              onClick={handleToggleFavorite}
            >
              {isFavorite ?
                <XIcon size={44} />
              : <HeartIcon
                  size={44}
                  className={`w-full h-full transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-foreground/70'}`}
                />
              }
            </Button>
          }
        </div>
      </div>
    </motion.div>
  );
}
