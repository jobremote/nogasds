import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../cx';
import './avatar.css';

export type AvatarTone = 'neutral' | 'wine' | 'petrol' | 'olive';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Nome da pessoa. Gera as iniciais (quando não há `initials`) e o texto acessível. */
  name?: string;
  /** Iniciais explícitas (até 2 letras). */
  initials?: string;
  /** Foto. Quando presente, substitui as iniciais (Figma: estilo Imagem). */
  src?: string;
  /** Figma: Estilo (Neutro, Vinho, Petróleo, Oliva). */
  tone?: AvatarTone;
  /** Figma: Tamanho (Pequeno 32, Médio 40, Grande 56). */
  size?: AvatarSize;
}

function initialsFrom(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, initials, src, tone = 'neutral', size = 'md', className, ...rest },
  ref,
) {
  const text = (initials ?? initialsFrom(name)).slice(0, 2).toUpperCase();
  return (
    <span
      {...rest}
      ref={ref}
      role={name ? 'img' : undefined}
      aria-label={name}
      aria-hidden={name ? undefined : true}
      className={cx('nds-avatar', `nds-avatar--${tone}`, `nds-avatar--${size}`, src && 'nds-avatar--image', className)}
    >
      {src ? <img className="nds-avatar__image" src={src} alt="" /> : text}
    </span>
  );
});
