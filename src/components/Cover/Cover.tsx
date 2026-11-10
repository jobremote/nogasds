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
}

/**
 * Faixa de capa de página ou perfil. Preenche a largura do contêiner: 200 px de altura no desktop e 120 px
 * em telas estreitas (Figma: Tamanho Desktop e Mobile).
 */
export const Cover = forwardRef<HTMLDivElement, CoverProps>(function Cover(
  { src, alt = '', placeholder, className, ...rest },
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
        <img className="nds-cover__image" src={src} alt={alt} />
      ) : placeholder ? (
        <Icon name="image" size={32} />
      ) : null}
    </div>
  );
});
