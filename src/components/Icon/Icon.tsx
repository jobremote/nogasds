import type { SVGAttributes } from 'react';
import { iconPaths, type IconName } from './paths';
import './icon.css';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** Nome do ícone da biblioteca Icons do NogasDS. */
  name: IconName;
  /** Lado em px. A grade dos ícones é 24; o padrão é 24. */
  size?: number;
  /** Texto acessível. Sem ele o ícone é decorativo (aria-hidden). */
  label?: string;
}

/** Ícone SVG que herda a cor do texto (`currentColor`). */
export function Icon({ name, size = 24, label, className, ...rest }: IconProps) {
  return (
    <svg
      {...rest}
      className={['nds-icon', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}
