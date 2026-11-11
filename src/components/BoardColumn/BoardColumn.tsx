import { Children, forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './board-column.css';

export interface BoardColumnProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Nome da coluna. */
  title: ReactNode;
  /** Quantidade total de itens (pode ser maior que a quantidade mostrada). */
  count: number | string;
  /** Itens da coluna, normalmente `<ItemCard>`. Sem itens, aparece `emptyMessage` (Figma: Estado = Vazia). */
  children?: ReactNode;
  /** Mensagem da coluna vazia. */
  emptyMessage?: ReactNode;
  /** Ação no cabeçalho, depois da contagem (por exemplo, um `<IconButton>` "Adicionar"). */
  action?: ReactNode;
  /** Nível do título (`h2`…`h6`). Padrão: `h3`. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** Coluna de um quadro kanban (Figma: Coluna do Game Shelf). */
export const BoardColumn = forwardRef<HTMLElement, BoardColumnProps>(function BoardColumn(
  { title, count, children, emptyMessage, action, headingLevel = 3, className, ...rest },
  ref,
) {
  const headingId = useId();
  const Heading = `h${headingLevel}` as const;
  const items = Children.toArray(children);
  return (
    <section {...rest} ref={ref} aria-labelledby={headingId} className={cx('nds-board-column', className)}>
      <header className="nds-board-column__header">
        <Heading id={headingId} className="nds-board-column__title">
          {title}
        </Heading>
        <span className="nds-board-column__count">{count}</span>
        {action ? <span className="nds-board-column__action">{action}</span> : null}
      </header>
      {items.length > 0 ? (
        <ul className="nds-board-column__list">
          {items.map((item, index) => (
            <li key={index} className="nds-board-column__item">
              {item}
            </li>
          ))}
        </ul>
      ) : emptyMessage ? (
        <p className="nds-board-column__empty">{emptyMessage}</p>
      ) : null}
    </section>
  );
});
