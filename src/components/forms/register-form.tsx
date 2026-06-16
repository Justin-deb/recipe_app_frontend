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
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Register } from '../../services/user-service';

const formSchema = z
  .object({
    username: z
      .string()
      .min(4, 'Minimo 4 caracteres')
      .max(30, 'Maximo 30 caracteres'),
    email: z.email('Debe ser un correo válido').trim(),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .refine(
        (val) => !val.includes(' '),
        'La contraseña no puede contener espacios'
      ),
    confirm_password: z.string()
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password']
  });

export function RegisterForm() {
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage('user_session');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    mode: 'onBlur'
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await Register(data);
    if (res.error) {
      toast.error(res.error);
    } else {
      setUser(res.data);
      toast.success(`Te has registrado exitosamente, ${res.data?.username}`);
      navigate('/cuenta');
    }
    console.log(res);
  }

  return (
    <Card className='w-full sm:max-w-md rounded h-full'>
      <CardHeader>
        <CardTitle>Registrarse</CardTitle>
        <CardDescription>
          Guarda recetas, crea las tuyas propias y administra tu perfil en la
          plataforma.
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
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-input-username'>
                    Nombre de usuario
                  </FieldLabel>
                  <Input
                    {...field}
                    name='username'
                    id='form-rhf-input-username'
                    aria-invalid={fieldState.invalid}
                    placeholder='Juan Bautista'
                    autoComplete='username'
                    required
                    aria-required
                    min={4}
                    max={30}
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
                    required
                    aria-required
                    type='email'
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
                    id='form-rhf-input-password'
                    aria-invalid={fieldState.invalid}
                    placeholder='*******'
                    autoComplete='password'
                    required
                    aria-required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name='confirm_password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-input-confirm-password'>
                    Confirmar contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-input-password'
                    aria-invalid={fieldState.invalid}
                    placeholder='*******'
                    required
                    aria-required
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
            onClick={() => navigate('/login')}
          >
            Ya eres usuario? Inicia Sesion
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
