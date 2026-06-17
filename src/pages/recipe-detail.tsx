import { useNavigate, useParams } from 'react-router';
import type { Recipe } from '../types/types';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../services/recipe-service';
import { Button } from '../components/ui/button';
import { ArrowLeftIcon, HeartIcon } from 'lucide-react';
import noImage from '/no-image.jpg';
import { motion } from 'motion/react';
import { CreateCommentForm } from '../components/forms/create-comment-form';
import { useLocalStorage } from '@uidotdev/usehooks';
import type { UserSession } from '../types/user-session';
import {
  AddFavorite,
  RemoveFavorite
} from '../services/favorite-service';
import { toast } from 'sonner';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState<string>(noImage);
  const [favorites, setFavorites] =
    useLocalStorage<Recipe[]>('favorites');
  const [user] = useLocalStorage<UserSession | null>(
    'user_session'
  );

  const isFavorite = favorites?.some(
    (favorite) => favorite.id === recipe?.id
  );

  const handleAddFavorite = async () => {
    if (!recipe) return;

    const res = await AddFavorite(recipe.id, user!);
    if (res.error) {
      console.error(res.error);
      toast.error(res.error);
    } else {
      toast.info('Receta agregada a favoritos');
      setFavorites([...(favorites || []), recipe]);
    }
  };

  const handleRemoveFavorite = async () => {
    if (!recipe) return;
    const res = await RemoveFavorite(
      recipe.id,
      user?.userId || 3
    );
    if (res.error) {
      console.error(res.error);
    } else {
      toast.info('Receta eliminada de favoritos');
      setFavorites(
        favorites?.filter(
          (favorite) => favorite.id !== recipe.id
        )
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRecipe = async () => {
      if (!id) {
        setRecipe(null);
        return;
      }
      const res = await getRecipeById(id!);
      setRecipe(res.error ? null : res.data);
      setImageURL(res.data?.photoUrl || noImage);
    };
    fetchRecipe();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='w-full'>
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
        <div className='absolute flex z-10 w-full justify-between p-2'>
          {/* Flag image */}
          <img
            src={recipe?.countryFlag}
            style={{
              viewTransitionName: `recipe-flag-image-${id}`
            }}
            className='rounded-full shadow-xl max-w-[40px] object-cover'
          />

          {/* Favorite button */}
          <Button
            className='rounded shadow-xl'
            style={{
              viewTransitionName: `recipe-favorite-button-${id}`
            }}
            onClick={
              isFavorite ?
                handleRemoveFavorite
              : handleAddFavorite
            }
          >
            <HeartIcon />
            <span>
              {isFavorite ?
                'Quitar de favoritos'
              : 'Agregar a favoritos'}
            </span>
          </Button>
        </div>

        {/* Dish image */}
        <img
          className='w-full h-full object-cover rounded max-h-[300px]'
          src={imageURL}
          style={{
            viewTransitionName: `recipe-image-${id}`
          }}
          onError={() => setImageURL(noImage)}
        />
      </div>

      {/* Name */}
      <h1
        style={{ viewTransitionName: `recipe-name-${id}` }}
        className='p-3 rounded mt-2 text-2xl font-bold text-primary-foreground bg-primary
        flex items-center justify-center min-h-12'
      >
        {recipe?.name}
      </h1>

      {/* Favorites and country */}
      <div className='flex p-2 justify-between'>
        <h3
          className='opacity-40 text-sm pb-2 text-center'
          style={{
            viewTransitionName: `recipe-favorites-${id}`
          }}
        >
          Guardado 24 veces
        </h3>
        <h3
          className='text-primary/80 text-sm pb-2 text-center underline'
          style={{
            viewTransitionName: `recipe-author-${id}`
          }}
        >
          {recipe?.username &&
            `Subido por ${recipe?.username}`}
        </h3>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='text-lg pt-2 opacity-90'
      >
        {recipe?.description}
      </motion.p>

      {/* Comments */}
      <div className='flex flex-col p-4 bg-accent rounded text-accent-foreground mt-2 gap-2 w-full mb-4'>
        {recipe?.comments.length === 0 ?
          'No hay comentarios, se el primero'
        : recipe?.comments.map((comment) => (
            <div
              className='flex flex-col gap-0 w-full'
              key={comment.id}
            >
              <h1 className='text-primary font-extrabold text-md'>
                {comment.title}
              </h1>
              <h4 className='text-xs pb-1 text-accent-foreground/80'>
                Autor: {comment.username}
              </h4>
              <p className='text-md break-all'>
                {comment.description}
              </p>
            </div>
          ))
        }
      </div>
      <CreateCommentForm recipeId={id || recipe?.id} />
    </div>
  );
}
