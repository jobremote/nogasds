import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../cx';
import './badge.css';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'error' | 'rose' | 'sky';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma: Tipo (Neutro, Informação, Sucesso, Erro, Rosa, Céu). */
  tone?: BadgeTone;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', className, ...rest },
  ref,
) {
  return <span {...rest} ref={ref} className={cx('nds-badge', `nds-badge--${tone}`, className)} />;
});
