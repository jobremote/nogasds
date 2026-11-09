import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Variante (Primário, Secundário, Contorno, Fantasma). */
  variant?: ButtonVariant;
  /** Figma: Tamanho (Médio, Pequeno). */
  size?: ButtonSize;
  /** Figma: Lead (booleano) + Ícone lead. Ícone antes do texto: um `<Icon>` ou `<Logo>`. O botão ajusta o tamanho (20 px no médio, 16 px no pequeno). */
  leadingIcon?: ReactNode;
  /** Figma: Trailing (booleano) + Ícone trailing. Ícone depois do texto: um `<Icon>` ou `<Logo>`. */
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', type = 'button', leadingIcon, trailingIcon, className, children, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={cx('nds-button', `nds-button--${variant}`, `nds-button--${size}`, className)}
    >
      {leadingIcon ? <span className="nds-button__icon">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="nds-button__icon">{trailingIcon}</span> : null}
    </button>
  );
});
