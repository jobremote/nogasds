import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { MentionList, getMentionOptionId, type MentionItem } from './MentionList';

const items: MentionItem[] = [
  { id: 'a', label: 'Item A', detail: '2017 · Detalhe A' },
  { id: 'b', label: 'Item B', detail: '2025 · Detalhe B', thumbnail: '/b.jpg' },
  { id: 'c', label: 'Item C' },
];

describe('MentionList', () => {
  it('é uma lista de opções com nome acessível e a ativa marcada', () => {
    render(<MentionList label="Sugestões" items={items} activeIndex={1} />);
    expect(screen.getByRole('listbox', { name: 'Sugestões' })).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('2017 · Detalhe A')).toBeInTheDocument();
  });

  it('dá a cada opção um id previsível, para o aria-activedescendant do campo', () => {
    render(<MentionList label="Sugestões" id="lista" items={items} />);
    const options = screen.getAllByRole('option');
    expect(options[2]).toHaveAttribute('id', getMentionOptionId('lista', 2));
    expect(getMentionOptionId('lista', 2)).toBe('lista-option-2');
  });

  it('escolhe a sugestão ao clicar e avisa a posição ao passar o mouse', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onActiveChange = vi.fn();
    render(<MentionList label="Sugestões" items={items} onSelect={onSelect} onActiveChange={onActiveChange} />);
    await user.hover(screen.getByRole('option', { name: /Item B/ }));
    expect(onActiveChange).toHaveBeenCalledWith(1);
    await user.click(screen.getByRole('option', { name: /Item B/ }));
    expect(onSelect).toHaveBeenCalledWith(items[1], 1);
  });

  it('não tira o foco do campo ao pressionar uma opção', () => {
    render(<MentionList label="Sugestões" items={items} />);
    const option = screen.getAllByRole('option')[0];
    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    option.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('mostra a mensagem quando não há itens e a dica abaixo', () => {
    render(<MentionList label="Sugestões" items={[]} emptyMessage="Nada encontrado." hint="Esc fecha" />);
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('Nada encontrado.');
    expect(screen.getByText('Esc fecha')).toBeInTheDocument();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<MentionList label="Sugestões" items={items} activeIndex={0} hint="↑ ↓ navegar" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
