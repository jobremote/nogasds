import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import './cover.css';

export interface CoverProps extends HTMLAttributes<HTMLDivElement> {
  /** Imagem de capa (Figma: Tipo = Imagem). Sem ela, a capa é uma faixa de cor sólida (Figma: Tipo = Cor sólida). */
  src?: string;
  /** Texto alternativo da imagem. Vazio por padrão, porque a capa costuma ser decorativa. */
  alt?: string;
  /** Sem `src`: mostra o espaço da imagem, com o ícone de imagem, em vez da cor sólida (Figma: Tipo = Imagem sem foto). */
  placeholder?: boolean;
  /** Enquadramento vertical da imagem, de 0 (topo) a 100 (base). Padrão: 50 (centro). Só vale com `src`. */
  positionY?: number;
}

/**
 * Faixa de capa de página ou perfil. Preenche a largura do contêiner: 200 px de altura no desktop e 120 px
 * em telas estreitas (Figma: Tamanho Desktop e Mobile).
 */
export const Cover = forwardRef<HTMLDivElement, CoverProps>(function Cover(
  { src, alt = '', placeholder, positionY = 50, className, ...rest },
  ref,
) {
  const empty = !src;
  return (
    <div
      {...rest}
      ref={ref}
      className={cx('nds-cover', empty && placeholder && 'nds-cover--placeholder', className)}
    >
      {src ? (
        <img className="nds-cover__image" src={src} alt={alt} style={{ objectPosition: `50% ${Math.min(100, Math.max(0, positionY))}%` }} />
      ) : placeholder ? (
        <Icon name="image" size={32} />
      ) : null}
    </div>
  );
});
