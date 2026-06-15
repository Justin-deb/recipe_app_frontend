import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { useNavigate } from 'react-router';

const formSchema = z.object({
  email: z.email('Debe ser un correo valido').trim(),
  password: z.string().trim()
});
export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast('You submitted the following values:', {
      description: (
        <pre className='mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground'>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2'
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)'
      } as React.CSSProperties
    });
  }
  return (
    <Card className='w-full sm:max-w-md rounded h-full'>
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>
          Guarda recetas, crea las tuyas propias y administra tu perfil al
          iniciar sesion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className='flex gap-5 flex-col'
          id='form-rhf-input'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-input-email'>Correo</FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-input-email'
                    aria-invalid={fieldState.invalid}
                    placeholder='correo@dominio.com'
                    autoComplete='email'
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
          <FieldGroup>
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-input-password'>
                    Contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-input-email'
                    aria-invalid={fieldState.invalid}
                    placeholder='*******'
                    autoComplete='password'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <div>
          <Button
            type='submit'
            form='form-rhf-input'
            className='rounded w-full'
          >
            Iniciar Sesion
          </Button>
          <Button
            variant={'link'}
            type='button'
            form='form-rhf-input'
            className='rounded w-full pt-4 text-xs'
            onClick={() => navigate('/register')}
          >
            No tienes cuenta? Registrate
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
