import type { SVGAttributes } from 'react';
import logos from './logos.json';
import '../Icon/icon.css';

export type LogoName = keyof typeof logos;

export interface LogoProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** Nome do logo da biblioteca Icons do NogasDS (`logo/<nome>` no Figma). */
  name: LogoName;
  /** Lado em px. A grade é 24; o padrão é 24. */
  size?: number;
  /** Texto acessível. Sem ele o logo é decorativo (aria-hidden). */
  label?: string;
}

/**
 * Logo de marca de terceiros, com cores fixas (não herda `currentColor`).
 * Use conforme as diretrizes de marca de quem é dono do logo.
 */
export function Logo({ name, size = 24, label, className, ...rest }: LogoProps) {
  return (
    <svg
      {...rest}
      className={['nds-icon', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      focusable="false"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {logos[name].map((p) => (
        <path key={p.fill} d={p.d} fill={p.fill} />
      ))}
    </svg>
  );
}
