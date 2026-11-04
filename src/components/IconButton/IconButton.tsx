import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/paths';
import type { ButtonSize, ButtonVariant } from '../Button/Button';
import '../Button/button.css';
import './icon-button.css';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  /** Ícone da biblioteca Icons. */
  icon: IconName;
  /** Nome acessível (obrigatório: o botão não tem texto visível). */
  label: string;
  /** Figma: Variante. Padrão: `ghost`. */
  variant?: ButtonVariant;
  /** Figma: Tamanho (Médio 40 px, Pequeno 32 px). */
  size?: ButtonSize;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant = 'ghost', size = 'md', type = 'button', className, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      aria-label={label}
      className={cx('nds-button', `nds-button--${variant}`, 'nds-icon-button', `nds-icon-button--${size}`, className)}
    >
      <Icon name={icon} size={size === 'md' ? 24 : 20} />
    </button>
  );
});
