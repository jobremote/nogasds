import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './top-bar.css';

export interface TopBarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Marca ou logotipo do produto (o sistema não traz marca própria). */
  brand: ReactNode;
  /** Busca, normalmente um `<SearchField>`. */
  search?: ReactNode;
  /** Ações à direita: botões de ícone, avatar. */
  actions?: ReactNode;
}

/** Barra superior de desktop (64 px de altura, `--nds-size-nav-height`). */
export const TopBar = forwardRef<HTMLElement, TopBarProps>(function TopBar(
  { brand, search, actions, className, ...rest },
  ref,
) {
  return (
    <header {...rest} ref={ref} className={cx('nds-top-bar', className)}>
      <div className="nds-top-bar__brand">{brand}</div>
      <div className="nds-top-bar__search">{search}</div>
      <div className="nds-top-bar__actions">{actions}</div>
    </header>
  );
});

/** Barra superior mobile (56 px). */
export const MobileTopBar = forwardRef<HTMLElement, Omit<TopBarProps, 'search'>>(function MobileTopBar(
  { brand, actions, className, ...rest },
  ref,
) {
  return (
    <header {...rest} ref={ref} className={cx('nds-top-bar', 'nds-top-bar--mobile', className)}>
      <div className="nds-top-bar__brand">{brand}</div>
      <div className="nds-top-bar__actions">{actions}</div>
    </header>
  );
});
