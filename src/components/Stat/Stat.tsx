import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './stat.css';

export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** O número ou valor em destaque. */
  value: ReactNode;
  /** Legenda abaixo do valor. */
  label: ReactNode;
  /**
   * Figma: Destaque. `primary` (padrão): número grande e em negrito, para os contadores mais importantes.
   * `secondary`: número menor, leve e em cor secundária, para os de apoio.
   */
  emphasis?: 'primary' | 'secondary';
}

/** Valor com legenda. Use dentro de um `<dl>` quando houver vários. */
export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  { value, label, emphasis = 'primary', className, ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref} className={cx('nds-stat', `nds-stat--${emphasis}`, className)}>
      <dt className="nds-stat__label">{label}</dt>
      <dd className="nds-stat__value">{value}</dd>
    </div>
  );
});
