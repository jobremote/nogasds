import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './media-tag.css';

interface MediaTagBase {
  /** Texto do item (por exemplo, o nome). */
  children: ReactNode;
  /** Miniatura à esquerda. Sem ela, mostra o espaço reservado. */
  thumbnail?: string;
}

export type MediaTagProps =
  | (MediaTagBase & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'>)
  | (MediaTagBase & { href?: undefined } & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>);

/**
 * Etiqueta com miniatura e nome (Figma: Marca de jogo). Com `href` vira um link; sem, é só um rótulo. Para um selo de
 * status ao lado, ponha um `Badge` antes dela.
 */
export const MediaTag = forwardRef<HTMLAnchorElement | HTMLSpanElement, MediaTagProps>(function MediaTag(
  { children, thumbnail, href, className, ...rest },
  ref,
) {
  const content = (
    <>
      <span className="nds-media-tag__thumbnail" aria-hidden="true">
        {thumbnail ? <img src={thumbnail} alt="" /> : null}
      </span>
      <span className="nds-media-tag__label">{children}</span>
    </>
  );
  if (href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cx('nds-media-tag', 'nds-media-tag--link', className)}>
        {content}
      </a>
    );
  }
  return (
    <span {...(rest as HTMLAttributes<HTMLSpanElement>)} ref={ref as React.Ref<HTMLSpanElement>} className={cx('nds-media-tag', className)}>
      {content}
    </span>
  );
});
