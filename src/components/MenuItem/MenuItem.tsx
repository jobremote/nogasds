import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/paths';
import './menu-item.css';

interface MenuItemBase {
  /** Ícone da biblioteca Icons. */
  icon?: IconName;
  /** Figma: Estado Ativo. Marca a página atual (`aria-current="page"`). */
  active?: boolean;
  children: ReactNode;
}

export type MenuItemProps = MenuItemBase &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'>)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>)
  );

/** Item de menu lateral. Com `href` vira link; sem `href`, botão. */
export const MenuItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, MenuItemProps>(function MenuItem(
  { icon, active, children, className, ...rest },
  ref,
) {
  const classes = cx('nds-menu-item', active && 'nds-menu-item--active', className);
  const content = (
    <>
      {icon ? <Icon name={icon} size={24} /> : null}
      <span className="nds-menu-item__label">{children}</span>
    </>
  );
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} ref={ref as React.Ref<HTMLAnchorElement>} aria-current={active ? 'page' : undefined} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      ref={ref as React.Ref<HTMLButtonElement>}
      aria-current={active ? 'page' : undefined}
      className={classes}
    >
      {content}
    </button>
  );
});
