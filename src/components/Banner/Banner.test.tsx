import { render, screen } from '@testing-library/react';
import { axe } from '../../test/axe';
import { Banner } from './Banner';

describe('Banner', () => {
  it('mostra título e descrição', () => {
    render(<Banner title="Aviso">Detalhes do aviso.</Banner>);
    expect(screen.getByText('Aviso')).toBeInTheDocument();
    expect(screen.getByText('Detalhes do aviso.')).toBeInTheDocument();
  });

  it('informação e sucesso usam role="status"; erro usa role="alert"', () => {
    const { rerender } = render(<Banner variant="info" title="T" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(<Banner variant="success" title="T" />);
    expect(screen.getByRole('status')).toHaveClass('nds-banner--success');
    rerender(<Banner variant="error" title="T" />);
    expect(screen.getByRole('alert')).toHaveClass('nds-banner--error');
  });

  it('não exige descrição', () => {
    const { container } = render(<Banner title="Só título" />);
    expect(container.querySelector('.nds-banner__description')).toBeNull();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Banner variant="info" title="Informação">Descrição</Banner>
        <Banner variant="success" title="Sucesso">Descrição</Banner>
        <Banner variant="error" title="Erro">Descrição</Banner>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
