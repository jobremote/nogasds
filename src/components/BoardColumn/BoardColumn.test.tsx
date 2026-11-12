import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { ItemCard } from '../ItemCard/ItemCard';
import { BoardColumn } from './BoardColumn';

describe('BoardColumn', () => {
  it('é uma região nomeada pelo título, com a contagem', () => {
    render(
      <BoardColumn title="Coluna" count={2}>
        <ItemCard title="A" />
        <ItemCard title="B" />
      </BoardColumn>,
    );
    expect(screen.getByRole('region', { name: 'Coluna' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Coluna' })).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('mostra a ação do cabeçalho depois da contagem, só quando há', () => {
    const { rerender } = render(<BoardColumn title="Coluna" count={1} action={<button type="button">Adicionar jogo</button>} />);
    expect(screen.getByRole('button', { name: 'Adicionar jogo' })).toBeInTheDocument();
    rerender(<BoardColumn title="Coluna" count={1} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('com maxHeight, limita a altura e só a lista rola (foco pelo teclado); sem maxHeight, nada muda', () => {
    const { container, rerender } = render(
      <BoardColumn title="Coluna" count={2}>
        <ItemCard title="A" />
        <ItemCard title="B" />
      </BoardColumn>,
    );
    expect(container.querySelector('.nds-board-column__scroll')).toBeNull();
    expect(screen.getByRole('region', { name: 'Coluna' })).not.toHaveStyle({ maxHeight: '640px' });
    rerender(
      <BoardColumn title="Coluna" count={2} maxHeight={640}>
        <ItemCard title="A" />
        <ItemCard title="B" />
      </BoardColumn>,
    );
    expect(screen.getByRole('region', { name: 'Coluna' })).toHaveStyle({ maxHeight: '640px' });
    const scroller = container.querySelector('.nds-board-column__scroll') as HTMLElement;
    expect(scroller).toHaveAttribute('tabindex', '0');
    expect(scroller.querySelectorAll('li')).toHaveLength(2);
    rerender(<BoardColumn title="Coluna" count={0} maxHeight="40rem" emptyMessage="Nada." />);
    expect(container.querySelector('.nds-board-column__scroll')).toBeNull(); // vazia: sem área de rolagem
    expect(screen.getByText('Nada.')).toBeInTheDocument();
  });

  it('lista os itens', () => {
    render(
      <BoardColumn title="Coluna" count={2}>
        <ItemCard title="A" />
        <ItemCard title="B" />
      </BoardColumn>,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('sem itens mostra a mensagem de vazio e nenhuma lista', () => {
    render(<BoardColumn title="Coluna" count={0} emptyMessage="Nada aqui." />);
    expect(screen.getByText('Nada aqui.')).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('o nível do título é configurável', () => {
    render(<BoardColumn title="Coluna" count={0} headingLevel={2} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <BoardColumn title="Coluna" count={1}>
        <ItemCard title="A" detail="Apoio" rating={3} />
      </BoardColumn>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
