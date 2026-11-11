import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Toast } from './Toast';

describe('Toast', () => {
  it('mostra título e descrição', () => {
    render(<Toast title="Jogo adicionado">Zelda entrou em Jogando.</Toast>);
    expect(screen.getByText('Jogo adicionado')).toBeInTheDocument();
    expect(screen.getByText('Zelda entrou em Jogando.')).toBeInTheDocument();
  });

  it('sucesso e informação usam role="status"; erro usa role="alert"', () => {
    const { rerender } = render(<Toast variant="success" title="T" />);
    expect(screen.getByRole('status')).toHaveClass('nds-toast--success');
    rerender(<Toast variant="error" title="T" />);
    expect(screen.getByRole('alert')).toHaveClass('nds-toast--error');
  });

  it('só mostra o botão de fechar quando há onClose', () => {
    const onClose = vi.fn();
    const { rerender } = render(<Toast title="T" />);
    expect(screen.queryByRole('button')).toBeNull();
    rerender(<Toast title="T" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Toast variant="info" title="Informação" onClose={() => {}}>Descrição</Toast>
        <Toast variant="success" title="Sucesso">Descrição</Toast>
        <Toast variant="error" title="Erro">Descrição</Toast>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
