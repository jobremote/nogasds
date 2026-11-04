import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cx } from '../cx';
import './link.css';

export type LinkSize = 'md' | 'sm';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Figma: Tamanho (Médio, Pequeno). */
  size?: LinkSize;
  /** Desabilita o link: remove o destino e marca `aria-disabled`. */
  disabled?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { size = 'md', disabled, href, className, onClick, ...rest },
  ref,
) {
  return (
    // O conteúdo (children) chega por {...rest}.
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...rest}
      ref={ref}
      href={disabled ? undefined : href}
      role={disabled ? 'link' : undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled ? (event) => event.preventDefault() : onClick}
      className={cx('nds-link', `nds-link--${size}`, disabled && 'nds-link--disabled', className)}
    />
  );
});
