import { useParams } from 'react-router';
import type { Recipe } from '../types/types';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../services/recipe-service';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setRecipe(null);
      }
      const res = await getRecipeById(id!);
      setRecipe(res.error ? null : res.data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <div>
        <h1>No se encontró la receta :&#40;</h1>
      </div>
    );
  }

  return (
    <ViewTransition>
      <div>
        {/* Image container */}
        <div className='w-full max-h-[300px] min-h-[300px]'>
          <img
            className='w-full h-full contain-layout'
            src={recipe.photo_url}
            style={{ viewTransitionName: `recipe-img-${recipe.id}` }}
          />
        </div>
      </div>
    </ViewTransition>
  );
}
