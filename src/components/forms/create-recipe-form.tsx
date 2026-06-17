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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { CreateRecipe } from '../../services/recipe-service';
import { getCountries, getIngredients } from '../../services/data-service';
import type { Country, Ingredient } from '../../types/types';

// 1. Definimos el esquema de validación con Zod
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
  // Asumimos que los ingredientes son un array de IDs (si es un multi-select)
  // o un solo string si es un select simple. Aquí lo dejamos como array para multi-select.
  ingredients: z.array(z.string()).min(1, 'Selecciona al menos un ingrediente')
});

export function CreateRecipeForm() {
  const navigate = useNavigate();

  // Estados para almacenar los datos de los selectores
  const [countries, setCountries] = useState<Country[]>([]);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

  // 2. Inicializamos el formulario
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

  // 3. Obtenemos los países e ingredientes al montar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        const [countriesData, ingredientsData] = await Promise.all([
          getCountries(),
          getIngredients()
        ]);
        setCountries(countriesData);
        setIngredientsList(ingredientsData);
      } catch (error) {
        toast.error('Error al cargar los datos de países e ingredientes');
      }
    }
    fetchData();
  }, []);

  // 4. Función para manejar el envío
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await CreateRecipe(data);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(`Receta "${data.name}" creada exitosamente`);
      navigate('/recetas'); // O la ruta a la que desees redirigir
    }
  }

  return (
    <Card className='w-full sm:max-w-2xl rounded h-full mx-auto'>
      <CardHeader>
        <CardTitle>Crear Nueva Receta</CardTitle>
        <CardDescription>
          Comparte tu creación con el mundo. Añade una sinopsis, los pasos y
          selecciona los ingredientes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className='flex gap-5 flex-col'
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
                      // Manejo custom para el multi-select nativo en RHF
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
          variant='outline'
          type='button'
          onClick={() => navigate(-1)}
          className='rounded'
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          form='form-create-recipe'
          className='rounded'
        >
          Publicar Receta
        </Button>
      </CardFooter>
    </Card>
  );
}
