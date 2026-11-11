import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import type { TagColor } from '../Tag/Tag';
import '../Tag/tag.css';
import './item-card.css';

export interface ItemCardTag {
  label: string;
  color?: TagColor;
}

export interface ItemCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  /** Linha de apoio abaixo do título (por exemplo, uma categoria). */
  detail?: ReactNode;
  /** Nota de 1 a 5. Quando ausente, a linha da nota não aparece (Figma: Nota = Não). */
  rating?: number;
  /** Figma: Tags (booleano). Etiquetas do item, só de leitura, abaixo da nota. */
  tags?: ItemCardTag[];
  /** Imagem em miniatura. Sem ela, mostra o espaço reservado. */
  thumbnail?: string;
}

/** Item compacto com miniatura, título, apoio e nota opcional (Figma: Card de jogo). */
export const ItemCard = forwardRef<HTMLElement, ItemCardProps>(function ItemCard(
  { title, detail, rating, tags, thumbnail, className, ...rest },
  ref,
) {
  return (
    <article {...rest} ref={ref} className={cx('nds-item-card', className)}>
      <div className="nds-item-card__thumbnail" aria-hidden="true">
        {thumbnail ? <img src={thumbnail} alt="" /> : null}
      </div>
      <div className="nds-item-card__text">
        <p className="nds-item-card__title">{title}</p>
        {detail ? <p className="nds-item-card__detail">{detail}</p> : null}
        {rating ? (
          <p className="nds-item-card__rating" role="img" aria-label={`Nota ${rating} de 5`}>
            <Icon name="star-fill" size={16} />
            <span aria-hidden="true">{rating}</span>
          </p>
        ) : null}
        {tags && tags.length > 0 ? (
          <ul className="nds-item-card__tags" aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag.label} className={cx('nds-tag', 'nds-tag--static', `nds-tag--${tag.color ?? 'neutral'}`)}>
                {tag.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
});
