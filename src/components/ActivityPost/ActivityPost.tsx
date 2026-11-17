import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import '../Post/post.css';
import './activity-post.css';

export interface ActivityPostProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Nome de quem compartilhou (também é o nome do avatar). */
  author: string;
  /** Troca o texto do nome por outro conteúdo, normalmente um link para o perfil. */
  authorLink?: ReactNode;
  /** Linha abaixo do nome: identificador e horário, por exemplo `@usuario · há 2 h`. */
  meta?: ReactNode;
  /** Propriedades do avatar do autor. */
  avatar?: Omit<AvatarProps, 'name' | 'size'>;
  /** Menu do post, normalmente `<IconButton icon="more-horiz" label="Mais opções" />`. */
  menu?: ReactNode;
  /** Frase da atividade, por exemplo "Zerou" ou "Começou a jogar" (Figma: Atividade). */
  phrase: ReactNode;
  /** Texto opcional escrito pela pessoa ao compartilhar. */
  note?: ReactNode;
  /** Trecho da review, em um bloco destacado (Figma: Atividade = Review). Fica antes do card do jogo. */
  excerpt?: ReactNode;
  /** Imagem da atividade (Figma: Atividade = Screenshot). Fica antes do card do jogo. */
  media?: ReactNode;
  /** Card do jogo: use `<ActivityGame>`. */
  game: ReactNode;
  /** Ações (curtir, comentar): use `<PostAction>`. */
  actions?: ReactNode;
}

/**
 * Post gerado por uma atividade do Game Shelf (Figma: Post de atividade). Estrutura: autor, frase, texto opcional,
 * trecho de review ou imagem, card do jogo e ações. Nada é publicado sem a pessoa compartilhar; a regra de quando a
 * atividade existe é do produto.
 */
export const ActivityPost = forwardRef<HTMLElement, ActivityPostProps>(function ActivityPost(
  { author, authorLink, meta, avatar, menu, phrase, note, excerpt, media, game, actions, className, ...rest },
  ref,
) {
  return (
    <article {...rest} ref={ref} className={cx('nds-post', 'nds-activity-post', className)}>
      <header className="nds-post__header">
        <Avatar {...avatar} name={author} size="md" />
        <div className="nds-post__author">
          <p className="nds-post__name">{authorLink ?? author}</p>
          {meta ? <p className="nds-post__meta">{meta}</p> : null}
        </div>
        {menu}
      </header>
      <p className="nds-activity-post__phrase">{phrase}</p>
      {note ? <div className="nds-activity-post__note">{note}</div> : null}
      {excerpt ? <blockquote className="nds-activity-post__excerpt">{excerpt}</blockquote> : null}
      {media ? <div className="nds-activity-post__media">{media}</div> : null}
      {game}
      {actions ? <footer className="nds-activity-post__actions">{actions}</footer> : null}
    </article>
  );
});

export interface ActivityGameProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  /** Capa do jogo (normalmente uma `<img>`); sem ela, mostra um bloco de cor. */
  cover?: ReactNode;
  /** Nome do jogo. */
  title: ReactNode;
  /** Linha de apoio, por exemplo `2022 · PC (Windows)`. */
  meta?: ReactNode;
  /** Linha de destaque, por exemplo `38 h · Nota 5 de 5`. Só quando a pessoa informou. */
  detail?: ReactNode;
  /** Selo do status, normalmente `<Badge>`. */
  badge?: ReactNode;
}

/** Card clicável do jogo dentro do `ActivityPost` (Figma: Jogo clicável). Vira link quando recebe `href`. */
export function ActivityGame({ cover, title, meta, detail, badge, className, href, ...rest }: ActivityGameProps) {
  const body = (
    <>
      <span className="nds-activity-game__cover" aria-hidden={cover ? undefined : true}>
        {cover}
      </span>
      <span className="nds-activity-game__texts">
        <span className="nds-activity-game__title">{title}</span>
        {meta ? <span className="nds-activity-game__meta">{meta}</span> : null}
        {detail ? <span className="nds-activity-game__detail">{detail}</span> : null}
      </span>
      {badge}
    </>
  );
  return href ? (
    <a {...rest} href={href} className={cx('nds-activity-game', 'nds-activity-game--link', className)}>
      {body}
    </a>
  ) : (
    <div className={cx('nds-activity-game', className)}>{body}</div>
  );
}
