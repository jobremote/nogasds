import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './mention-list.css';

export interface MentionItem {
  id: string;
  /** Texto principal (por exemplo, o nome). */
  label: ReactNode;
  /** Linha de detalhe abaixo do texto. */
  detail?: ReactNode;
  /** Miniatura à esquerda. Sem ela, mostra o espaço reservado. */
  thumbnail?: string;
}

export interface MentionListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'children'> {
  /** Nome acessível da lista. */
  label: string;
  /** Sugestões, na ordem em que aparecem. */
  items: MentionItem[];
  /** Posição da sugestão ativa (em destaque); `-1` ou vazio, nenhuma. */
  activeIndex?: number;
  /** Chamado ao escolher uma sugestão (clique). A tecla Enter fica por conta do campo de texto. */
  onSelect?: (item: MentionItem, index: number) => void;
  /** Chamado ao passar o mouse sobre uma sugestão. */
  onActiveChange?: (index: number) => void;
  /** Linha de dica abaixo da lista, por exemplo, as teclas de navegação. */
  hint?: ReactNode;
  /** Mensagem quando `items` está vazio. Sem ela, a lista vazia não mostra nada. */
  emptyMessage?: ReactNode;
}

/** Identificador do `option` da posição dada; use no `aria-activedescendant` do campo de texto. */
export const getMentionOptionId = (listId: string, index: number): string => `${listId}-option-${index}`;

/**
 * Lista de sugestões que abre abaixo de um campo de texto quando a pessoa digita um gatilho, como "@" (Figma:
 * Sugestões de jogo (@)). Só apresenta: o campo de texto cuida do teclado (setas, Enter e Esc) e aponta para a opção
 * ativa com `aria-activedescendant={getMentionOptionId(id, activeIndex)}`.
 */
export const MentionList = forwardRef<HTMLDivElement, MentionListProps>(function MentionList(
  { label, items, activeIndex = -1, onSelect, onActiveChange, hint, emptyMessage, id, className, ...rest },
  ref,
) {
  const autoId = useId();
  const listId = id ?? autoId;
  const empty = items.length === 0;
  return (
    <div {...rest} id={listId} ref={ref} className={cx('nds-mention-list', className)}>
      {empty ? (
        emptyMessage ? (
          <p className="nds-mention-list__empty" role="status">
            {emptyMessage}
          </p>
        ) : null
      ) : (
        <ul className="nds-mention-list__list" role="listbox" aria-label={label}>
          {items.map((item, index) => (
            // Padrão de combobox: o foco fica no campo de texto, que cuida do teclado (aria-activedescendant); a opção
            // só responde ao mouse e ao toque.
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={item.id}
              id={getMentionOptionId(listId, index)}
              role="option"
              aria-selected={index === activeIndex}
              className={cx('nds-mention-list__option', index === activeIndex && 'nds-mention-list__option--active')}
              // Não tira o foco do campo de texto ao clicar.
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => onActiveChange?.(index)}
              onClick={() => onSelect?.(item, index)}
            >
              <span className="nds-mention-list__thumbnail" aria-hidden="true">
                {item.thumbnail ? <img src={item.thumbnail} alt="" /> : null}
              </span>
              <span className="nds-mention-list__text">
                <span className="nds-mention-list__title">{item.label}</span>
                {item.detail ? <span className="nds-mention-list__detail">{item.detail}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      )}
      {hint ? <p className="nds-mention-list__hint">{hint}</p> : null}
    </div>
  );
});
