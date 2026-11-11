import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon, type IconProps } from '../Icon/Icon';
import './toast.css';

export type ToastVariant = 'info' | 'success' | 'error';

const icons: Record<ToastVariant, IconProps['name']> = {
  info: 'info',
  success: 'check-circle',
  error: 'error',
};

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Tipo (Informação, Sucesso, Erro). */
  variant?: ToastVariant;
  title: ReactNode;
  /** Descrição abaixo do título. */
  children?: ReactNode;
  /** Quando informado, mostra o botão de fechar. O fechamento automático fica por conta de quem usa. */
  onClose?: () => void;
  /** Nome acessível do botão de fechar. */
  closeLabel?: string;
}

/** Aviso temporário de uma ação (Figma: Toast). Posicione-o na tela; ele só desenha o aviso. */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { variant = 'success', title, children, onClose, closeLabel = 'Fechar aviso', className, role, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      role={role ?? (variant === 'error' ? 'alert' : 'status')}
      className={cx('nds-toast', `nds-toast--${variant}`, className)}
    >
      <Icon name={icons[variant]} size={20} />
      <div className="nds-toast__text">
        <p className="nds-toast__title">{title}</p>
        {children ? <p className="nds-toast__description">{children}</p> : null}
      </div>
      {onClose ? (
        <button type="button" className="nds-toast__close" aria-label={closeLabel} onClick={onClose}>
          <Icon name="close" size={20} />
        </button>
      ) : null}
    </div>
  );
});
