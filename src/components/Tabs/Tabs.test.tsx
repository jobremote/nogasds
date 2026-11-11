import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Tabs, type TabItem } from './Tabs';

const items: TabItem[] = [
  { value: 'um', label: 'Primeira' },
  { value: 'dois', label: 'Segunda' },
  { value: 'tres', label: 'Terceira', disabled: true },
  { value: 'quatro', label: 'Quarta' },
];

function Controlled() {
  const [value, setValue] = useState('um');
  return <Tabs label="Exemplo" items={items} value={value} onChange={setValue} />;
}

describe('Tabs', () => {
  it('expõe tablist e tabs com a selecionada marcada', () => {
    render(<Tabs label="Exemplo" items={items} value="dois" onChange={() => undefined} />);
    expect(screen.getByRole('tablist', { name: 'Exemplo' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(4);
    expect(screen.getByRole('tab', { name: 'Segunda' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Primeira' })).toHaveAttribute('aria-selected', 'false');
  });

  it('só a aba selecionada entra na ordem de tabulação', () => {
    render(<Tabs label="Exemplo" items={items} value="dois" onChange={() => undefined} />);
    expect(screen.getByRole('tab', { name: 'Segunda' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Primeira' })).toHaveAttribute('tabindex', '-1');
  });

  it('chama onChange ao clicar', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs label="Exemplo" items={items} value="um" onChange={onChange} />);
    await user.click(screen.getByRole('tab', { name: 'Segunda' }));
    expect(onChange).toHaveBeenCalledWith('dois');
  });

  it('setas, Home e End trocam a aba e pulam as desabilitadas', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Segunda' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Segunda' })).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Quarta' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Primeira' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Quarta' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Primeira' })).toHaveFocus();
  });

  it('aba preenchida mostra o ponto e avisa o leitor de tela', () => {
    render(<Tabs label="Exemplo" items={[{ value: 'um', label: 'Jogatina', filled: true }, { value: 'dois', label: 'Review' }]} value="um" onChange={() => undefined} />);
    const filled = screen.getByRole('tab', { name: /Jogatina/ });
    expect(filled).toHaveTextContent('Jogatina (preenchida)');
    expect(filled.querySelector('.nds-tabs__dot')).not.toBeNull();
    expect(screen.getByRole('tab', { name: 'Review' }).querySelector('.nds-tabs__dot')).toBeNull();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Tabs label="Exemplo" items={items} value="um" onChange={() => undefined} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
