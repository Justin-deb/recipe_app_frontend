import {
  HomeIcon,
  UserRound,
  type LucideProps
} from 'lucide-react';

type NavLink = {
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> &
      React.RefAttributes<SVGSVGElement>
  >;
};

export const NAV_LINKS: NavLink[] = [
  {
    href: '/',
    label: 'Inicio',
    icon: HomeIcon
  },
  {
    href: '/cuenta',
    label: 'Cuenta',
    icon: UserRound
  }
];
