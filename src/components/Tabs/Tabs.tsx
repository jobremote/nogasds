import { forwardRef, useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../cx';
import './tabs.css';

export interface TabItem {
  value: string;
  label: ReactNode;
  /** `id` do painel que a aba controla (opcional, mas recomendado). */
  controls?: string;
  disabled?: boolean;
  /** Figma: Preenchido. Mostra um ponto na aba que já tem algo preenchido. */
  filled?: boolean;
  /** Texto para leitor de tela quando a aba está preenchida. Padrão: "preenchida". */
  filledLabel?: string;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  /** Valor da aba selecionada. */
  value: string;
  onChange: (value: string) => void;
  /** Nome acessível da lista de abas. */
  label: string;
}

/** Barra de abas. O painel de cada aba é do produto; ligue-o com `controls`/`aria-labelledby`. */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, value, onChange, label, className, id, ...rest },
  ref,
) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const enabled = items.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const position = enabled.findIndex((entry) => entry.index === index);
    let target: number | undefined;
    if (event.key === 'ArrowRight') target = enabled[(position + 1) % enabled.length]?.index;
    else if (event.key === 'ArrowLeft') target = enabled[(position - 1 + enabled.length) % enabled.length]?.index;
    else if (event.key === 'Home') target = enabled[0]?.index;
    else if (event.key === 'End') target = enabled[enabled.length - 1]?.index;
    if (target === undefined) return;
    event.preventDefault();
    buttons.current[target]?.focus();
    onChange(items[target].value);
  };

  return (
    <div {...rest} ref={ref} id={id} role="tablist" aria-label={label} className={cx('nds-tabs', className)}>
      {items.map((item, index) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            id={id ? `${id}-${item.value}` : undefined}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={item.controls}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            className={cx('nds-tabs__tab', selected && 'nds-tabs__tab--selected')}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {item.label}
            {item.filled ? (
              <>
                <span className="nds-tabs__dot" aria-hidden="true" />
                <span className="nds-tabs__filled-label"> ({item.filledLabel ?? 'preenchida'})</span>
              </>
            ) : null}
          </button>
        );
      })}
    </div>
  );
});
