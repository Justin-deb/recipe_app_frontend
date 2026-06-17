'use client';
import * as motion from 'motion/react-client';

import { cn } from './../../lib/utils';
import { NAV_LINKS } from './NAV_LINKS';
import { useLocation, useNavigate } from 'react-router';

type DesktopNavBarProps = {
  className?: string;
};

export function DesktopNavBar({
  className
}: DesktopNavBarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className='w-full p-2'>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 26
        }}
        role='navigation'
        aria-label='Main Navigation'
        className={cn(
          'hidden md:flex items-center gap-1 bg-card dark:bg-card border border-border dark:border-sidebar-border rounded-full px-2 py-1.5 shadow-xl w-full justify-center',
          className
        )}
      >
        {NAV_LINKS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/' ?
              pathname === '/'
            : pathname.startsWith(item.href);

          return (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(item.href)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              type='button'
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                isActive ?
                  'bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary'
                : 'text-muted-foreground dark:text-muted-foreground hover:bg-muted dark:hover:bg-muted',
                'focus:outline-none focus-visible:ring-0'
              )}
            >
              <Icon size={18} strokeWidth={2} aria-hidden />
              <span className='whitespace-nowrap select-none'>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
}

export default DesktopNavBar;
