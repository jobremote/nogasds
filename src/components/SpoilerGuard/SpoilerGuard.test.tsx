import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { SpoilerGuard } from './SpoilerGuard';

describe('SpoilerGuard', () => {
  it('esconde o conteúdo atrás de um aviso e do botão Mostrar', () => {
    render(
      <SpoilerGuard>
        <p>O vilão é o pai.</p>
      </SpoilerGuard>,
    );
    expect(screen.getByText('Contém spoiler')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mostrar' })).toBeInTheDocument();
    // Fora do alcance de leitor de tela e de foco enquanto escondido.
    const content = screen.getByText('O vilão é o pai.', { ignore: '' }).parentElement as HTMLElement;
    expect(content).toHaveAttribute('aria-hidden', 'true');
    expect(content).toHaveAttribute('inert');
    expect(screen.queryByText('O vilão é o pai.', { selector: '[aria-hidden="false"] *' })).toBeNull();
  });

  it('mostrar revela o conteúdo e some o aviso', async () => {
    const user = userEvent.setup();
    render(
      <SpoilerGuard>
        <p>O vilão é o pai.</p>
      </SpoilerGuard>,
    );
    await user.click(screen.getByRole('button', { name: 'Mostrar' }));
    expect(screen.queryByText('Contém spoiler')).toBeNull();
    const content = screen.getByText('O vilão é o pai.').parentElement as HTMLElement;
    expect(content).not.toHaveAttribute('aria-hidden');
    expect(content).not.toHaveAttribute('inert');
  });

  it('com active={false} mostra o conteúdo direto', () => {
    render(
      <SpoilerGuard active={false}>
        <p>Sem spoiler.</p>
      </SpoilerGuard>,
    );
    expect(screen.queryByRole('button', { name: 'Mostrar' })).toBeNull();
    expect(screen.getByText('Sem spoiler.')).toBeVisible();
  });

  it('textos do aviso e do botão são trocáveis', () => {
    render(
      <SpoilerGuard label="Spoiler!" revealLabel="Ver">
        <p>x</p>
      </SpoilerGuard>,
    );
    expect(screen.getByText('Spoiler!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ver' })).toBeInTheDocument();
  });

  it('não tem violações de acessibilidade (escondido e revelado)', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SpoilerGuard>
        <p>Conteúdo</p>
      </SpoilerGuard>,
    );
    expect(await axe(container)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Mostrar' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
