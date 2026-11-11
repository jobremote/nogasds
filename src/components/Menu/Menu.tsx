import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/paths';
import './menu.css';

const CloseContext = createContext<() => void>(() => {});

export interface MenuProps {
  /** Conteúdo do botão que abre o menu (por exemplo, um ícone). */
  trigger: ReactNode;
  /** Nome acessível do botão que abre o menu. */
  label: string;
  /** Lado em que o menu se alinha ao botão. */
  align?: 'start' | 'end';
  /** Opções (`MenuOption`). */
  children: ReactNode;
  className?: string;
}

/** Botão que abre uma lista de ações (Figma: Menu). Fecha com Esc, clique fora ou ao escolher uma opção. */
export function Menu({ trigger, label, align = 'end', children, className }: MenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const id = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    list.current?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')?.focus();
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      setOpen(false);
      button.current?.focus();
      return;
    }
    if (event.key === 'Tab') {
      setOpen(false);
      return;
    }
    const items = Array.from(list.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    const go = (next: number) => {
      event.preventDefault();
      items[(next + items.length) % items.length]?.focus();
    };
    if (event.key === 'ArrowDown') go(index + 1);
    else if (event.key === 'ArrowUp') go(index - 1);
    else if (event.key === 'Home') go(0);
    else if (event.key === 'End') go(items.length - 1);
  };

  return (
    <div ref={root} className={cx('nds-menu', className)}>
      <button
        ref={button}
        type="button"
        className="nds-menu__trigger"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </button>
      {open ? (
        <div
          ref={list}
          id={id}
          role="menu"
          aria-label={label}
          tabIndex={-1}
          className={cx('nds-menu__list',`nds-menu__list--${align}`)}
          onKeyDown={onKeyDown}
        >
          <CloseContext.Provider value={close}>{children}</CloseContext.Provider>
        </div>
      ) : null}
    </div>
  );
}

export interface MenuOptionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role'> {
  icon?: IconName;
  /** Ação destrutiva (Figma: Perigo). */
  danger?: boolean;
}

/** Opção de um `Menu`. Fecha o menu depois do clique. */
export const MenuOption = forwardRef<HTMLButtonElement, MenuOptionProps>(function MenuOption(
  { icon, danger, className, children, onClick, ...rest },
  ref,
) {
  const close = useContext(CloseContext);
  return (
    <button
      type="button"
      {...rest}
      ref={ref}
      role="menuitem"
      className={cx('nds-menu__option', danger && 'nds-menu__option--danger', className)}
      onClick={(event) => {
        onClick?.(event);
        close();
      }}
    >
      {icon ? <Icon name={icon} size={20} /> : null}
      <span>{children}</span>
    </button>
  );
});
