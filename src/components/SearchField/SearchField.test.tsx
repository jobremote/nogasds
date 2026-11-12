import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { SearchField } from './SearchField';

function Controlled({ initial = '', withClear = true }: { initial?: string; withClear?: boolean }) {
  const [value, setValue] = useState(initial);
  return <SearchField label="Buscar jogo" value={value} onChange={(event) => setValue(event.target.value)} onClear={withClear ? () => setValue('') : undefined} />;
}

describe('SearchField', () => {
  it('é uma busca com nome acessível', () => {
    render(<Controlled />);
    expect(screen.getByRole('searchbox', { name: 'Buscar jogo' })).toBeInTheDocument();
  });

  it('o X só aparece quando há texto e há onClear', async () => {
    const user = userEvent.setup();
    render(<Controlled />);
    expect(screen.queryByRole('button', { name: 'Limpar busca' })).toBeNull();
    await user.type(screen.getByRole('searchbox'), 'mega man x');
    expect(screen.getByRole('button', { name: 'Limpar busca' })).toBeInTheDocument();
  });

  it('sem onClear não há X, mesmo com texto', () => {
    render(<Controlled initial="zelda" withClear={false} />);
    expect(screen.queryByRole('button', { name: 'Limpar busca' })).toBeNull();
  });

  it('clicar no X esvazia o campo, some o X e o foco volta para o campo', async () => {
    const user = userEvent.setup();
    render(<Controlled initial="mega man x" />);
    await user.click(screen.getByRole('button', { name: 'Limpar busca' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getByRole('searchbox')).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Limpar busca' })).toBeNull();
  });

  it('o nome do botão é trocável e o ref continua funcionando', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<SearchField ref={ref} label="Buscar" value="a" onChange={() => {}} onClear={() => {}} clearLabel="Apagar" />);
    expect(screen.getByRole('button', { name: 'Apagar' })).toBeInTheDocument();
    expect(ref.current).toBe(screen.getByRole('searchbox'));
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Controlled initial="texto" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
