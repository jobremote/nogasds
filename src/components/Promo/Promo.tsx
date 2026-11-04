import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import './promo.css';

export interface PromoProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Imagem. Sem ela, mostra um espaço reservado com ícone. */
  media?: ReactNode;
  /** Selo acima do título, normalmente um `<Badge>` (por exemplo "Patrocinado"). */
  badge?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  /** Ação ao final, normalmente um `<Button variant="outline" size="sm">`. */
  action?: ReactNode;
}

/** Conteúdo promocional (Figma: Anúncio). */
export const Promo = forwardRef<HTMLElement, PromoProps>(function Promo(
  { media, badge, title, children, action, className, ...rest },
  ref,
) {
  return (
    <aside {...rest} ref={ref} className={cx('nds-promo', className)}>
      <div className="nds-promo__media">{media ?? <Icon name="image" size={24} />}</div>
      <div className="nds-promo__content">
        {badge ? <div className="nds-promo__badge">{badge}</div> : null}
        <p className="nds-promo__title">{title}</p>
        {children ? <p className="nds-promo__text">{children}</p> : null}
        {action ? <div className="nds-promo__action">{action}</div> : null}
      </div>
    </aside>
  );
});
