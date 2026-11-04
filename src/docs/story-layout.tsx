import type { ReactNode } from 'react';

/** Peças de layout para as histórias "Todos os estados". Só para o Storybook. */

export const Canvas = ({ children }: { children: ReactNode }) => <div className="sb-canvas">{children}</div>;

export const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="sb-section">
    <h3>{title}</h3>
    <div className="sb-row">{children}</div>
  </section>
);

interface CellProps {
  label: string;
  /** Força o estado hover (addon de pseudo-estados; o seletor vai em `parameters.pseudo`). */
  hover?: boolean;
  /** Força o estado de foco. */
  focus?: boolean;
  width?: number | string;
  children: ReactNode;
}

export const Cell = ({ label, hover, focus, width, children }: CellProps) => (
  <div className={['sb-cell', hover && 'sb-hover', focus && 'sb-focus'].filter(Boolean).join(' ')} style={{ width }}>
    {children}
    <small>{label}</small>
  </div>
);
