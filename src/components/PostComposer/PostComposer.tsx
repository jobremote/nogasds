import {
  forwardRef,
  useState,
  type FormEvent,
  type FormHTMLAttributes,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
} from 'react';
import { cx } from '../cx';
import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import './post-composer.css';

export interface PostComposerProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange' | 'defaultValue'> {
  /** Nome acessível do campo de texto. */
  label: string;
  placeholder?: string;
  /** Propriedades do avatar de quem escreve. */
  avatar?: Omit<AvatarProps, 'size'>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Chamado com o texto ao enviar. */
  onSubmit?: (value: string) => void;
  /** Limite de caracteres; mostra o contador `n/limite`. */
  maxLength?: number;
  submitLabel?: string;
  /** Ferramentas à esquerda da barra de ações (botões de ícone, interruptores). */
  tools?: ReactNode;
  /**
   * Habilita ou desabilita o botão de enviar. Padrão: habilitado quando há texto. Passe `true` para aceitar o envio sem
   * texto (por exemplo, com uma imagem anexada) e `false` para barrar por outro motivo (por exemplo, enviando).
   */
  canSubmit?: boolean;
  disabled?: boolean;
  /** Referência do campo de texto, para ler e mudar a posição do cursor (por exemplo, ao inserir uma menção). */
  inputRef?: Ref<HTMLTextAreaElement>;
  /**
   * Atributos extras do campo de texto: teclado (`onKeyDown`), cursor (`onSelect`, `onClick`) e ARIA (`role="combobox"`,
   * `aria-activedescendant`, `aria-controls`, `aria-expanded`) para uma lista de sugestões.
   */
  inputProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'defaultValue' | 'onChange' | 'maxLength' | 'disabled' | 'aria-label' | 'placeholder'
  >;
  /** Lista de sugestões logo abaixo do campo (normalmente um `<MentionList>`). */
  suggestions?: ReactNode;
  /** Itens anexados entre o campo e a barra de ações (por exemplo, marcas escolhidas). */
  attachments?: ReactNode;
}

/** Caixa de criação de publicação (Figma: Criar post). */
export const PostComposer = forwardRef<HTMLFormElement, PostComposerProps>(function PostComposer(
  {
    label,
    placeholder,
    avatar,
    value: valueProp,
    defaultValue = '',
    onChange,
    onSubmit,
    maxLength,
    submitLabel = 'Publicar',
    tools,
    canSubmit,
    disabled,
    inputRef,
    inputProps,
    suggestions,
    attachments,
    className,
    ...rest
  },
  ref,
) {
  const controlled = valueProp !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const value = controlled ? valueProp : inner;
  const ready = canSubmit ?? value.trim().length > 0;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ready || disabled) return;
    onSubmit?.(value);
  };

  return (
    <form {...rest} ref={ref} onSubmit={submit} className={cx('nds-post-composer', className)}>
      <Avatar {...avatar} size="md" />
      <div className="nds-post-composer__editor">
        <textarea
          {...inputProps}
          ref={inputRef}
          className="nds-post-composer__input"
          aria-label={label}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          rows={3}
          onChange={(event) => {
            if (!controlled) setInner(event.target.value);
            onChange?.(event.target.value);
          }}
        />
        {suggestions}
        {attachments ? <div className="nds-post-composer__attachments">{attachments}</div> : null}
        <div className="nds-post-composer__actions">
          {tools}
          <span className="nds-post-composer__spacer" />
          {maxLength ? (
            <span className="nds-post-composer__counter" aria-live="polite">
              {value.length}/{maxLength}
            </span>
          ) : null}
          <Button type="submit" size="sm" disabled={!ready || disabled}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
});
