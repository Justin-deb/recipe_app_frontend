import { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import type { Country, Recipe } from '../types/types';
import { getRecipes } from '../services/recipe-service';
import { Spinner } from '../components/ui/spinner';
import { RecipeCard } from '../components/recipe-card';
import { AnimatePresence, motion } from 'motion/react';
import { Field, FieldGroup, FieldLabel } from '../components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { getCountries } from '../services/country-service';


export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(
    [] as Recipe[]
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([] as Country[]);
  const [countrySelectedId, setCountrySelectedId] = useState<string | undefined>();

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const res = await getRecipes();
      const countryRequest = await getCountries();
      if (res.error) {
        setError(res.error);
        setRecipes([] as Recipe[]);
      } else if (countryRequest.error) {
        setError(res.error);
        setCountries([] as Country[]);
      } else {
        setRecipes(res.data!.sort((r1,r2)=>r1.name.localeCompare(r2.name)));
        setCountries(countryRequest.data!);
        setError(null);
      }
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  const onSubmitFilter = () => { }

  const form = useForm({
    defaultValues: {
      countryId: "",
    },
  });

  return (
    <div className='w-full min-h-dvh'>
      <h1 className='text-xl font-extrabold text-primary'>
        Buscar una receta
      </h1>
      <p className='leading-4.5 text-foreground/50 text-sm font-light pb-2'>
        Busca con pais, nombre o ingredientes. Encuentra
        justo lo que quieres cocinar para tu disfrute
      </p>
      <div className='flex flex-col items-start gap-2 mb-5'>
        <Input
          className='h-max bg-secondary placeholder:text-secondary-foreground/40 border-border shadow rounded mt-1 text-secondary-foreground p-4 focus:border-primary mb-4'
          inputMode='text'
          placeholder='Fideos con pollo...'
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
        />
        <form className='w-full' id='form-filter-country' onSubmit={onSubmitFilter}>
          <FieldGroup>
            <Controller
              name='countryId'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor='select-country'>
                    País de Origen
                  </FieldLabel>
                  <select
                    {...field}
                    id='select-country'
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log(value)
                      field.onChange(value);
                      setCountrySelectedId(value === '' ? undefined : value)
                    }}
                  >
                    <option value=''>
                      Selecciona un país...
                    </option>
                    {countries.map((c) => (
                      <option
                        key={c.id}
                        value={c.id.toString()}
                      >
                        {
                          c.name
                        }
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
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
                ).filter((recipe)=> countrySelectedId != undefined ? recipe.countryId == countrySelectedId : recipe)
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
