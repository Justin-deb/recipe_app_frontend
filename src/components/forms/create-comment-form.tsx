import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

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
  FieldError,
  FieldGroup,
  FieldLabel
} from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { useLocalStorage } from '@uidotdev/usehooks';
import type { UserSession } from '../../types/user-session';
import { CreateComment } from '../../services/comment-service';
import { useNavigate } from 'react-router';

const formSchema = z.object({
  title: z
    .string()
    .min(3, 'El titulo debe tener 3 caracteres mínimo')
    .max(50, 'El titulo no puede exceder 50 caracteres'),
  description: z.string().min(20, 'Minimo 20 caracteres')
});

export interface CreateCommentFormProps {
  recipeId: string;
}
export function CreateCommentForm({
  recipeId
}: CreateCommentFormProps) {
  const [user] = useLocalStorage<UserSession | null>(
    'user_session'
  );
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    },
    mode: 'onBlur'
  });

  async function onSubmit(
    data: z.infer<typeof formSchema>
  ) {
    if (!user) {
      toast.error(
        'Debes iniciar sesión para comentar una receta'
      );
      return;
    }

    const res = await CreateComment({
      title: data.title,
      description: data.description,
      recipeId: recipeId,
      currentUserSession: user
    });
    if (res.error) {
      //   toast.error(res.error);
      console.log(res);
    } else {
      toast.success(`Comentario publicado`);
      navigate('/recetas/' + recipeId);
    }
  }

  return (
    <Card className='w-full rounded'>
      <CardHeader>
        <CardTitle>Comentar</CardTitle>
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
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='input-title'>
                    Titulo
                  </FieldLabel>
                  <Input
                    {...field}
                    id='input-title'
                    aria-invalid={fieldState.invalid}
                    placeholder='Mi comentario'
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

          {/* Descripción */}
          <FieldGroup>
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='input-description'>
                    Descripción
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id='input-description'
                    aria-invalid={fieldState.invalid}
                    placeholder='Comenta que te parecio, si fue dificil o que tal la experiencia'
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
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type='submit'
          form='form-create-recipe'
          className='rounded w-full'
        >
          Comentar
        </Button>
      </CardFooter>
    </Card>
  );
}
