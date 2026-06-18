import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { CreateRecipe } from '../../services/recipe-service';
import type { Country, Ingredient } from '../../types/types';
import { getCountries } from '../../services/country-service';
import { getIngredients } from '../../services/ingredient-service';
import { useLocalStorage } from '@uidotdev/usehooks';
import type { UserSession } from '../../types/user-session';

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  description: z
    .string()
    .min(20, 'Añade una sinopsis y las instrucciones detalladas'),
  photoUrl: z.string().url('Debe ser una URL válida de imagen'),
  countryId: z.string().min(1, 'Debes seleccionar un país'),
  ingredients: z.array(z.string()).min(1, 'Selecciona al menos un ingrediente')
});

export function CreateRecipeForm() {
  const navigate = useNavigate();

  const [user] = useLocalStorage<UserSession | null>('user_session');
  const [countries, setCountries] = useState<Country[]>([]);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      photoUrl: '',
      countryId: '',
      ingredients: []
    },
    mode: 'onBlur'
  });

  useEffect(() => {
    async function fetchData() {
      const [countriesData, ingredientsData] = await Promise.all([
        getCountries(),
        getIngredients()
      ]);
      setCountries(countriesData.data ?? []);
      setIngredientsList(ingredientsData.data ?? []);
    }
    fetchData();
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error('Debes iniciar sesión para crear una receta');
      return;
    }

    const res = await CreateRecipe({
      ...data,
      currentUserSession: user
    });
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(`Receta "${data.name}" creada exitosamente`);
      navigate('/recetas');
    }
  }

  return (
    <Card className='w-full rounded h-full pt-8'>
      <CardHeader>
        <CardTitle>Crear Nueva Receta</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className='flex gap-5 flex-col w-full'
          id='form-create-recipe'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Nombre de la Receta */}
          <FieldGroup>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='input-name'>
                    Nombre de la receta
                  </FieldLabel>
                  <Input
                    {...field}
                    id='input-name'
                    aria-invalid={fieldState.invalid}
                    placeholder='Ej. Gallo Pinto Tradicional'
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className='text-destructive'
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Descripción (Sinopsis e Instrucciones) */}
          <FieldGroup>
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='input-description'>
                    Descripción e Instrucciones
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id='input-description'
                    aria-invalid={fieldState.invalid}
                    placeholder='Escribe una breve sinopsis y luego los pasos a seguir...'
                    rows={6}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className='text-destructive'
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* URL de Imagen */}
          <FieldGroup>
            <Controller
              name='photoUrl'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='input-image'>
                    URL de la Imagen
                  </FieldLabel>
                  <Input
                    {...field}
                    id='input-image'
                    type='url'
                    aria-invalid={fieldState.invalid}
                    placeholder='https://ejemplo.com/imagen.jpg'
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className='text-destructive'
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {/* Selector de País */}
            <FieldGroup>
              <Controller
                name='countryId'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='select-country'>
                      País de Origen
                    </FieldLabel>
                    <select
                      {...field}
                      id='select-country'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value=''>Selecciona un país...</option>
                      {countries.map((c) => (
                        <option
                          key={c.id}
                          value={c.id.toString()}
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-destructive'
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Selector de Ingredientes (Múltiple) */}
            <FieldGroup>
              <Controller
                name='ingredients'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='select-ingredients'>
                      Ingredientes
                    </FieldLabel>
                    <select
                      multiple
                      id='select-ingredients'
                      className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]'
                      onChange={(e) => {
                        const values = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        field.onChange(values);
                      }}
                      value={field.value}
                    >
                      {ingredientsList.map((ing) => (
                        <option
                          key={ing.id}
                          value={ing.id.toString()}
                        >
                          {ing.name}
                        </option>
                      ))}
                    </select>
                    <FieldDescription className='hidden md:block'>
                      Manten CTRL y clickea para agregar varios
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-destructive'
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          type='submit'
          form='form-create-recipe'
          className='rounded w-full'
        >
          Publicar Receta
        </Button>
      </CardFooter>
    </Card>
  );
}
