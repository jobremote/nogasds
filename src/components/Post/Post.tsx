import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import { IconButton } from '../IconButton/IconButton';
import type { IconName } from '../Icon/paths';
import './post.css';

export interface PostProps extends HTMLAttributes<HTMLElement> {
  /** Nome de quem publicou (também é o nome do avatar). */
  author: string;
  /** Troca o texto do nome por outro conteúdo, normalmente um link para o perfil. Sem ele, mostra `author`. */
  authorLink?: ReactNode;
  /** Linha abaixo do nome: identificador e horário, por exemplo `@usuario · há 2 h`. */
  meta?: ReactNode;
  /** Propriedades do avatar do autor. */
  avatar?: Omit<AvatarProps, 'name' | 'size'>;
  /** Menu do post, normalmente `<IconButton icon="more-horiz" label="Mais opções" />`. */
  menu?: ReactNode;
  /** Selos do assunto, normalmente `<Badge>`s. */
  tags?: ReactNode;
  /** Texto da publicação. */
  children: ReactNode;
  /** Imagem ou mídia (Figma: Imagem = Sim). */
  media?: ReactNode;
  /** Ações à esquerda (curtir, comentar, compartilhar): use `<PostAction>`. */
  actions?: ReactNode;
  /** Ações à direita (salvar). */
  endActions?: ReactNode;
}

export const Post = forwardRef<HTMLElement, PostProps>(function Post(
  { author, authorLink, meta, avatar, menu, tags, children, media, actions, endActions, className, ...rest },
  ref,
) {
  return (
    <article {...rest} ref={ref} className={cx('nds-post', className)}>
      <header className="nds-post__header">
        <Avatar {...avatar} name={author} size="md" />
        <div className="nds-post__author">
          <p className="nds-post__name">{authorLink ?? author}</p>
          {meta ? <p className="nds-post__meta">{meta}</p> : null}
        </div>
        {menu}
      </header>
      {tags ? <div className="nds-post__tags">{tags}</div> : null}
      <div className="nds-post__body">{children}</div>
      {media ? <div className="nds-post__media">{media}</div> : null}
      {actions || endActions ? (
        <footer className="nds-post__footer">
          {actions}
          <span className="nds-post__spacer" />
          {endActions}
        </footer>
      ) : null}
    </article>
  );
});

export interface PostActionProps {
  icon: IconName;
  /** Nome acessível, por exemplo "Curtir". */
  label: string;
  /** Contador ao lado do ícone. */
  count?: number;
  /** Quando definido, o botão vira um alternador (`aria-pressed`). */
  pressed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

/** Botão de ícone com contador, para a barra de ações do `Post`. */
export function PostAction({ icon, label, count, pressed, onClick, disabled }: PostActionProps) {
  return (
    <span className="nds-post-action">
      <IconButton icon={icon} label={label} size="sm" aria-pressed={pressed} onClick={onClick} disabled={disabled} />
      {count !== undefined ? <span className="nds-post-action__count">{count}</span> : null}
    </span>
  );
}
