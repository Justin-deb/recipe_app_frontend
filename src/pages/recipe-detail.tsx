import { useNavigate, useParams } from 'react-router';
import type { Recipe } from '../types/types';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../services/recipe-service';
import { Button } from '../components/ui/button';
import { ArrowLeftIcon, HeartIcon } from 'lucide-react';
import noImage from '/no-image.jpg';
import { Input } from '../components/ui/input';
import { motion } from 'motion/react';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState<string>(noImage);

  useEffect(() => {
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
    navigate(-1, {
      viewTransition: true,
      preventScrollReset: true
    });
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
          >
            <HeartIcon />
            <span>Añadir a Favoritos</span>
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
      <div className='flex p-4 bg-accent rounded text-accent-foreground mt-2'>
        {recipe?.comments.length === 0 ?
          'No hay comentarios, se el primero'
        : recipe?.comments.map((comment) => (
            <div>
              <h1>{comment.title}</h1>
              <p
                style={{
                  viewTransitionName: `recipe-description-${id}`
                }}
              >
                {comment.description}
              </p>
              <h4>{comment.username}</h4>
            </div>
          ))
        }
      </div>
      <form className='p-4 bg-card mt-4 rounded h-max'>
        <h1 className='text-xl font-bolder text-primary'>
          Comentar
        </h1>
        <Input />
      </form>
    </div>
  );
}
