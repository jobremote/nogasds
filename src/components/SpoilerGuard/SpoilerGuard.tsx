import { forwardRef, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import './spoiler-guard.css';

export interface SpoilerGuardProps extends HTMLAttributes<HTMLDivElement> {
  /** Conteúdo com spoiler (imagem ou texto). Fica desfocado e fora do alcance de leitores de tela até o clique. */
  children: ReactNode;
  /** `false` mostra o conteúdo direto, sem proteção. Padrão: `true`. */
  active?: boolean;
  /** Texto do aviso sobre o conteúdo. */
  label?: string;
  revealLabel?: string;
}

/** Esconde um conteúdo com spoiler atrás de um clique: desfocado, com aviso e botão para mostrar. */
export const SpoilerGuard = forwardRef<HTMLDivElement, SpoilerGuardProps>(function SpoilerGuard(
  { children, active = true, label = 'Contém spoiler', revealLabel = 'Mostrar', className, ...rest },
  ref,
) {
  const [revealed, setRevealed] = useState(false);
  const id = useId();
  const hidden = active && !revealed;
  return (
    <div {...rest} ref={ref} className={cx('nds-spoiler', hidden && 'nds-spoiler--hidden', className)}>
      {/* Escondido: nem foco nem leitura (inert), só o aviso e o botão. */}
      <div id={id} className="nds-spoiler__content" aria-hidden={hidden || undefined} inert={hidden || undefined}>
        {children}
      </div>
      {hidden ? (
        <div className="nds-spoiler__cover">
          <Icon name="visibility-off" size={24} />
          <span className="nds-spoiler__label">{label}</span>
          <Button variant="secondary" size="sm" onClick={() => setRevealed(true)} aria-controls={id}>
            {revealLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
});
