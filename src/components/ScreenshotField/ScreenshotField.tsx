import { forwardRef, useId, useRef, type ChangeEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import './screenshot-field.css';

export interface ScreenshotFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'children'> {
  /** Rótulo visível do campo (Figma: Área de screenshot). */
  label: ReactNode;
  /** Endereço da imagem atual. Sem ele, mostra a área vazia com o botão de escolher. */
  src?: string;
  /** Texto alternativo da imagem. Padrão: vazio (o rótulo do campo já descreve). */
  alt?: string;
  /** Tipos aceitos no seletor de arquivo. */
  accept?: string;
  /** Arquivo escolhido. O envio é de quem usa. */
  onSelect: (file: File) => void;
  /** Mostra o botão de remover quando há imagem. */
  onRemove?: () => void;
  /** Enquanto envia: trava os botões e mostra o texto de envio. */
  uploading?: boolean;
  /** Texto de ajuda (formatos e peso). */
  helpText?: ReactNode;
  /** Mensagem de erro; substitui o texto de ajuda. */
  error?: ReactNode;
  disabled?: boolean;
  selectLabel?: string;
  changeLabel?: string;
  removeLabel?: string;
  uploadingLabel?: string;
}

/** Área para enviar uma imagem com prévia, trocar e remover (Figma: Área de screenshot). */
export const ScreenshotField = forwardRef<HTMLDivElement, ScreenshotFieldProps>(function ScreenshotField(
  {
    label,
    src,
    alt = '',
    accept = 'image/jpeg,image/png,image/webp',
    onSelect,
    onRemove,
    uploading,
    helpText,
    error,
    disabled,
    selectLabel = 'Escolher imagem',
    changeLabel = 'Trocar imagem',
    removeLabel = 'Remover imagem',
    uploadingLabel = 'Enviando imagem…',
    className,
    ...rest
  },
  ref,
) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);
  const message = hasError ? error : helpText;
  const busy = Boolean(uploading) || Boolean(disabled);

  const pick = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ''; // permite escolher o mesmo arquivo de novo
    if (file) onSelect(file);
  };

  return (
    <div {...rest} ref={ref} className={cx('nds-screenshot', hasError && 'nds-screenshot--invalid', className)}>
      <span id={`${id}-label`} className="nds-screenshot__label">
        {label}
      </span>
      <input
        ref={input}
        type="file"
        accept={accept}
        hidden
        tabIndex={-1}
        aria-hidden="true"
        disabled={busy}
        onChange={pick}
        data-testid="screenshot-input"
      />
      <div role="group" aria-labelledby={`${id}-label`} aria-describedby={message ? `${id}-message` : undefined} className="nds-screenshot__area">
        {src ? (
          <img className="nds-screenshot__preview" src={src} alt={alt} />
        ) : (
          <div className="nds-screenshot__empty">
            <Icon name="image" size={32} />
          </div>
        )}
        <div className="nds-screenshot__actions">
          <Button variant="outline" size="sm" onClick={() => input.current?.click()} disabled={busy}>
            {uploading ? uploadingLabel : src ? changeLabel : selectLabel}
          </Button>
          {src && onRemove ? (
            <Button variant="danger-ghost" size="sm" onClick={onRemove} disabled={busy}>
              {removeLabel}
            </Button>
          ) : null}
        </div>
      </div>
      {message ? (
        <p id={`${id}-message`} className="nds-screenshot__message">
          {message}
        </p>
      ) : null}
    </div>
  );
});
