import { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef, type DialogHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { IconButton } from '../IconButton/IconButton';
import './modal.css';

export interface ModalProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'open' | 'onClose'> {
  /** Abre ou fecha o modal. */
  open: boolean;
  /** Chamado ao fechar: botão de fechar, tecla Esc ou clique fora. O estado de `open` é de quem usa. */
  onClose: () => void;
  /** Título do modal (Figma: Modal cabeçalho). */
  title: ReactNode;
  /** Nome acessível do botão de fechar. */
  closeLabel?: string;
  /** Clicar no fundo escurecido fecha o modal. Padrão: `false` (fecha só no X, no Esc ou nos botões do rodapé). */
  closeOnBackdropClick?: boolean;
  /** Corpo do modal. */
  children?: ReactNode;
  /** Ações no rodapé, normalmente `<Button variant="outline">` e `<Button>` (Figma: Modal rodapé). */
  footer?: ReactNode;
}

/** Modal sobre o conteúdo, feito com o `<dialog>` nativo (foco preso, Esc e fundo escurecido pelo navegador). */
export const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { open, onClose, title, closeLabel = 'Fechar', closeOnBackdropClick = false, children, footer, className, ...rest },
  ref,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  }, [open]);

  const handleCancel = useCallback(
    (event: React.SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault(); // quem controla `open` é o produto
      onClose();
    },
    [onClose],
  );

  return (
    // O teclado fecha pelo Esc (evento `cancel`) e pelo botão de fechar; o clique no fundo é só um atalho do mouse.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <dialog
      {...rest}
      ref={dialogRef}
      aria-labelledby={titleId}
      className={cx('nds-modal', className)}
      onCancel={handleCancel}
      onClick={(event) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) onClose(); // clique no fundo escurecido (opcional)
      }}
    >
      <div className="nds-modal__header">
        <h2 id={titleId} className="nds-modal__title">
          {title}
        </h2>
        <IconButton icon="close" label={closeLabel} size="sm" onClick={onClose} />
      </div>
      <div className="nds-modal__body">{children}</div>
      {footer ? <div className="nds-modal__footer">{footer}</div> : null}
    </dialog>
  );
});
