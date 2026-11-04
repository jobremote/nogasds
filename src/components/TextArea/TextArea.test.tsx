import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('associa rótulo e aceita placeholder', () => {
    render(<TextArea label="Comentário" placeholder="Escreva aqui" />);
    expect(screen.getByLabelText('Comentário')).toHaveAttribute('placeholder', 'Escreva aqui');
  });

  it('liga ajuda e erro via aria-describedby; erro marca aria-invalid', () => {
    const { rerender } = render(<TextArea label="Comentário" helpText="Opcional." />);
    expect(screen.getByLabelText('Comentário')).toHaveAccessibleDescription('Opcional.');
    rerender(<TextArea label="Comentário" helpText="Opcional." error="Obrigatório." />);
    const field = screen.getByLabelText('Comentário');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Obrigatório.');
  });

  it('aceita digitação com quebra de linha e respeita disabled', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<TextArea label="Comentário" />);
    await user.type(screen.getByLabelText('Comentário'), 'oi{Enter}tudo');
    expect(screen.getByLabelText('Comentário')).toHaveValue('oi\ntudo');
    rerender(<TextArea label="Comentário" disabled />);
    expect(screen.getByLabelText('Comentário')).toBeDisabled();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <TextArea label="Padrão" helpText="Ajuda" />
        <TextArea label="Erro" error="Obrigatório" />
        <TextArea label="Desabilitado" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
