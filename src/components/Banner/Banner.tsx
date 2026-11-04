import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon, type IconProps } from '../Icon/Icon';
import './banner.css';

export type BannerVariant = 'info' | 'success' | 'error';

const icons: Record<BannerVariant, IconProps['name']> = {
  info: 'info',
  success: 'check-circle',
  error: 'error',
};

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Tipo (Informação, Sucesso, Erro). */
  variant?: BannerVariant;
  title: ReactNode;
  /** Descrição abaixo do título. */
  children?: ReactNode;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { variant = 'info', title, children, className, role, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      role={role ?? (variant === 'error' ? 'alert' : 'status')}
      className={cx('nds-banner', `nds-banner--${variant}`, className)}
    >
      <Icon name={icons[variant]} size={20} className="nds-banner__icon" />
      <div className="nds-banner__text">
        <p className="nds-banner__title">{title}</p>
        {children ? <p className="nds-banner__description">{children}</p> : null}
      </div>
    </div>
  );
});
