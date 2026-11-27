import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import './data-list.css';

export type DataListProps = HTMLAttributes<HTMLDListElement>;

/** Lista curta de pares rótulo e valor (tempos, ficha técnica). Use `DataRow` dentro. */
export const DataList = forwardRef<HTMLDListElement, DataListProps>(function DataList({ className, ...rest }, ref) {
  return <dl {...rest} ref={ref} className={cx('nds-data-list', className)} />;
});

export interface DataRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: ReactNode;
  /** Sem valor (`null`, `undefined` ou texto vazio), a linha não aparece: nada de zero ou "n/d". */
  value?: ReactNode;
}

/** Figma: Linha de dado. Rótulo à esquerda e valor à direita, com divisor embaixo. */
export const DataRow = forwardRef<HTMLDivElement, DataRowProps>(function DataRow({ label, value, className, ...rest }, ref) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div {...rest} ref={ref} className={cx('nds-data-row', className)}>
      <dt className="nds-data-row__label">{label}</dt>
      <dd className="nds-data-row__value">{value}</dd>
    </div>
  );
});
