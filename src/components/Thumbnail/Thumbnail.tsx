import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../cx';
import { SpoilerGuard } from '../SpoilerGuard/SpoilerGuard';
import './thumbnail.css';

export interface ThumbnailProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src: string;
  /** Descrição da imagem. */
  alt: string;
  /** Figma: Spoiler = Sim. A imagem fica desfocada, com aviso, até a pessoa pedir para ver. */
  spoiler?: boolean;
  spoilerLabel?: string;
  revealLabel?: string;
  /** Abre a imagem inteira. Com ela, a miniatura vira um botão (rotulado por `openLabel`). */
  onOpen?: () => void;
  /** Rótulo do botão de abrir, para leitores de tela. Padrão: "Abrir imagem". */
  openLabel?: string;
}

/** Figma: Miniatura. Imagem 16:9 de galeria; com `spoiler`, protegida pelo `SpoilerGuard`. */
export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(function Thumbnail(
  { src, alt, spoiler = false, spoilerLabel, revealLabel, onOpen, openLabel = 'Abrir imagem', className, ...rest },
  ref,
) {
  const image = <img className="nds-thumbnail__image" src={src} alt={onOpen ? '' : alt} />;
  return (
    <div {...rest} ref={ref} className={cx('nds-thumbnail', className)}>
      <SpoilerGuard active={spoiler} label={spoilerLabel} revealLabel={revealLabel} className="nds-thumbnail__guard">
        {onOpen ? (
          <button type="button" className="nds-thumbnail__open" onClick={onOpen} aria-label={`${openLabel}: ${alt}`}>
            {image}
          </button>
        ) : (
          image
        )}
      </SpoilerGuard>
    </div>
  );
});
