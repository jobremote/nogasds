import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx } from '../cx';
import './button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Variante (Primário, Secundário, Contorno, Fantasma). */
  variant?: ButtonVariant;
  /** Figma: Tamanho (Médio, Pequeno). */
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={cx('nds-button', `nds-button--${variant}`, `nds-button--${size}`, className)}
    />
  );
});
