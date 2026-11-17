import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import { PostAction } from '../Post/Post';
import './comment.css';

/**
 * Figma: Estado.
 * - `default`: texto e ações (Padrão e Curtido; o curtido vem de `liked`).
 * - `hidden`: só o aviso, sem o texto (Oculto, visto pelos leitores).
 * - `hidden-owner`: aviso pequeno + texto esmaecido + ações (Oculto (dono), visto por quem pode ler o texto).
 * - `deleted`: só o aviso, sem ações (Excluído).
 */
export type CommentStatus = 'default' | 'hidden' | 'hidden-owner' | 'deleted';

export interface CommentProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Nome de quem escreveu (também é o nome do avatar). */
  author: string;
  /** Troca o texto do nome por outro conteúdo, normalmente um link para o perfil. */
  authorLink?: ReactNode;
  /** Linha ao lado do nome: identificador, horário e "editado", por exemplo `@usuario · há 1 h`. */
  meta?: ReactNode;
  /** Propriedades do avatar do autor. O tamanho é sempre pequeno. */
  avatar?: Omit<AvatarProps, 'name' | 'size'>;
  /** Figma: Tipo. `reply` recua o comentário (resposta de 1º nível). */
  reply?: boolean;
  /** Figma: Estado. Padrão: `default`. */
  status?: CommentStatus;
  /** Texto do comentário. Não é mostrado em `hidden` nem em `deleted`. */
  children?: ReactNode;
  /**
   * Aviso. Em `hidden` e `deleted` é a mensagem que ocupa o lugar do texto; em `hidden-owner` é a linha pequena acima do texto.
   * Padrões: "Comentário oculto." e "Comentário excluído.".
   */
  notice?: ReactNode;
  /** Contador de curtidas. */
  likeCount?: number;
  /** Curtido: coração preenchido e contador em negrito. */
  liked?: boolean;
  /** Clique em curtir. Sem ele, o botão fica sem ação. */
  onLike?: () => void;
  /** Nome acessível do botão de curtir. Padrão: "Curtir". */
  likeLabel?: string;
  /** Ação de texto ao lado das curtidas (Figma: Responder, Mostrar de novo), normalmente `<Button variant="ghost" size="sm">`. */
  textAction?: ReactNode;
  /** Menu do comentário, normalmente `<IconButton icon="more-horiz" label="Mais opções" size="sm" />`. */
  menu?: ReactNode;
}

const defaultNotice: Record<'hidden' | 'deleted', string> = {
  hidden: 'Comentário oculto.',
  deleted: 'Comentário excluído.',
};

export const Comment = forwardRef<HTMLElement, CommentProps>(function Comment(
  { author, authorLink, meta, avatar, reply = false, status = 'default', children, notice, likeCount, liked, onLike, likeLabel = 'Curtir', textAction, menu, className, ...rest },
  ref,
) {
  const placeholder = status === 'hidden' || status === 'deleted';
  const ownerView = status === 'hidden-owner';
  return (
    <article {...rest} ref={ref} className={cx('nds-comment', reply && 'nds-comment--reply', `nds-comment--${status}`, className)}>
      <Avatar {...avatar} name={author} size="sm" />
      <div className="nds-comment__content">
        <p className="nds-comment__author">
          <span className="nds-comment__name">{authorLink ?? author}</span>
          {meta ? <span className="nds-comment__meta">{meta}</span> : null}
        </p>
        {placeholder ? (
          <div className="nds-comment__notice">
            {status === 'hidden' ? <Icon name="visibility-off" size={20} /> : null}
            <p className="nds-comment__notice-text">{notice ?? defaultNotice[status]}</p>
          </div>
        ) : (
          <>
            {ownerView ? (
              <p className="nds-comment__hint">
                <Icon name="visibility-off" size={16} />
                <span>{notice ?? defaultNotice.hidden}</span>
              </p>
            ) : null}
            <div className="nds-comment__body">{children}</div>
            <div className="nds-comment__actions">
              <PostAction icon="favorite" pressedIcon="favorite-fill" label={likeLabel} count={likeCount} pressed={liked ?? false} onClick={onLike} />
              {textAction}
              <span className="nds-comment__spacer" />
              {menu}
            </div>
          </>
        )}
      </div>
    </article>
  );
});
