import {
  CookingPot,
  HeartIcon,
  HomeIcon,
  PlusCircleIcon,
  UserRound,
  type LucideProps
} from 'lucide-react';

type NavLink = {
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
};

export const NAV_LINKS: NavLink[] = [
  {
    href: '/',
    label: 'Inicio',
    icon: HomeIcon
  },
  {
    href: '/favoritos',
    label: 'Favoritos',
    icon: HeartIcon
  },
  {
    href: '/recetas',
    label: 'Recetas',
    icon: CookingPot
  },
  {
    href: '/crear',
    label: 'Crear',
    icon: PlusCircleIcon
  },
  {
    href: '/cuenta',
    label: 'Cuenta',
    icon: UserRound
  }
];
