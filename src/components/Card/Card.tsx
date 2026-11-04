import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './card.css';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Imagem ou mídia no topo (Figma: Imagem = Sim). */
  media?: ReactNode;
  /** Texto pequeno em caixa alta acima do título. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Descrição curta. */
  children?: ReactNode;
  /** Ação ao final, normalmente um `<Link>` ou texto de link. */
  action?: ReactNode;
  /** Nível do título (`h2`…`h6`). Padrão: `h3`. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Ativa o realce de hover (borda forte). Use quando o card inteiro ou a ação são clicáveis. */
  interactive?: boolean;
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { media, eyebrow, title, children, action, headingLevel = 3, interactive, className, ...rest },
  ref,
) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article {...rest} ref={ref} className={cx('nds-card', interactive && 'nds-card--interactive', className)}>
      {media ? <div className="nds-card__media">{media}</div> : null}
      <div className="nds-card__content">
        {eyebrow ? <p className="nds-card__eyebrow">{eyebrow}</p> : null}
        <Heading className="nds-card__title">{title}</Heading>
        {children ? <p className="nds-card__description">{children}</p> : null}
        {action ? <div className="nds-card__action">{action}</div> : null}
      </div>
    </article>
  );
});
