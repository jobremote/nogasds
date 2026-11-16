import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './grouped-tags.css';

export interface GroupedTagsGroup {
  id: string;
  /** Selo do grupo, mostrado uma vez no começo da linha (normalmente um `<Badge>`). Sem ele, a linha mostra só os itens. */
  label?: ReactNode;
  /** Nome acessível do grupo (por exemplo, o nome do status), para leitores de tela. */
  name?: string;
  /** Itens do grupo, normalmente `<MediaTag>`s. */
  children: ReactNode;
}

export interface GroupedTagsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Grupos, na ordem em que aparecem. Cada um vira uma linha separada por um divisor. */
  groups: GroupedTagsGroup[];
}

/**
 * Itens agrupados em linhas, cada uma com um divisor em cima e um selo opcional no começo (Figma: Marcas de jogo
 * agrupadas por status). Pensado para o `tagsAfter` do `Post`: o primeiro divisor separa o texto do primeiro grupo.
 */
export const GroupedTags = forwardRef<HTMLDivElement, GroupedTagsProps>(function GroupedTags(
  { groups, className, ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref} className={cx('nds-grouped-tags', className)}>
      {groups.map((group) => (
        <div key={group.id} role="group" aria-label={group.name} className="nds-grouped-tags__row">
          {group.label}
          {group.children}
        </div>
      ))}
    </div>
  );
});
