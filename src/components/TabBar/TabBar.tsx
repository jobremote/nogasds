import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/paths';
import './tab-bar.css';

export interface TabBarItem {
  label: string;
  icon: IconName;
  /** Figma: variante Ativo. */
  active?: boolean;
  /** Com `href` o item é um link; sem, um botão. */
  href?: string;
  onClick?: () => void;
}

export interface TabBarProps extends HTMLAttributes<HTMLElement> {
  items: TabBarItem[];
  /** Nome acessível da navegação. */
  label: string;
}

/** Navegação inferior de mobile (64 px). */
export const TabBar = forwardRef<HTMLElement, TabBarProps>(function TabBar({ items, label, className, ...rest }, ref) {
  return (
    <nav {...rest} ref={ref} aria-label={label} className={cx('nds-tab-bar', className)}>
      {items.map((item) => {
        const content = (
          <>
            <Icon name={item.icon} size={24} />
            <span className="nds-tab-bar__label">{item.label}</span>
          </>
        );
        const props = {
          className: cx('nds-tab-bar__item', item.active && 'nds-tab-bar__item--active'),
          'aria-current': item.active ? ('page' as const) : undefined,
        };
        return item.href ? (
          <a key={item.label} href={item.href} onClick={item.onClick} {...props}>
            {content}
          </a>
        ) : (
          <button key={item.label} type="button" onClick={item.onClick} {...props}>
            {content}
          </button>
        );
      })}
    </nav>
  );
});
