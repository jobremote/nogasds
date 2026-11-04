import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './stat.css';

export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** O número ou valor em destaque. */
  value: ReactNode;
  /** Legenda abaixo do valor. */
  label: ReactNode;
}

/** Valor com legenda. Use dentro de um `<dl>` quando houver vários. */
export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat({ value, label, className, ...rest }, ref) {
  return (
    <div {...rest} ref={ref} className={cx('nds-stat', className)}>
      <dt className="nds-stat__label">{label}</dt>
      <dd className="nds-stat__value">{value}</dd>
    </div>
  );
});
