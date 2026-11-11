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
