import { Input } from '../components/ui/input';

export default function RecipesPage() {
  return (
    <div className='w-full min-h-dvh'>
      <h1 className='text-xl font-extrabold text-primary'>Buscar una receta</h1>
      <p className='leading-4.5 text-foreground/50 text-sm font-light pb-2'>
        Busca con pais, nombre o ingredientes. Encuentra justo lo que quieres
        cocinar para tu disfrute
      </p>
      <Input
        className='w-full bg-secondary placeholder:text-secondary-foreground/40 border-border shadow rounded mt-1 text-secondary-foreground p-4 focus:border-primary'
        inputMode='text'
        placeholder='Fideos con pollo...'
        autoFocus
      />
    </div>
  );
}
