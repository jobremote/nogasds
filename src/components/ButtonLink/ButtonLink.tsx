import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import type { ButtonSize, ButtonVariant } from '../Button/Button';
import '../Button/button.css';

export interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {
  /** Endereço de destino. */
  href: string;
  /** Figma: Variante (Primário, Secundário, Contorno, Fantasma, Perigo, Perigo fantasma). */
  variant?: ButtonVariant;
  /** Figma: Tamanho (Médio, Pequeno). */
  size?: ButtonSize;
  /** Ícone antes do texto: um `<Icon>` ou `<Logo>`. */
  leadingIcon?: ReactNode;
  /** Ícone depois do texto. */
  trailingIcon?: ReactNode;
}

/**
 * Link com a aparência do `Button` (Figma: Botão), para quando a ação é **ir para outra página**. Use `Button` para
 * ações que acontecem na própria tela. É um `<a>` de verdade: abre em nova aba, copia o endereço e funciona sem
 * JavaScript. Não aninhe um `Button` dentro de um link.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = 'primary', size = 'md', leadingIcon, trailingIcon, className, children, ...rest },
  ref,
) {
  return (
    <a {...rest} ref={ref} className={cx('nds-button', `nds-button--${variant}`, `nds-button--${size}`, className)}>
      {leadingIcon ? <span className="nds-button__icon">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="nds-button__icon">{trailingIcon}</span> : null}
    </a>
  );
});
