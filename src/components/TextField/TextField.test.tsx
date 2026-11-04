import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associa o rótulo ao campo e aceita placeholder configurável', () => {
    render(<TextField label="Nome" placeholder="Digite o nome" />);
    const input = screen.getByLabelText('Nome');
    expect(input).toHaveAttribute('placeholder', 'Digite o nome');
  });

  it('liga o texto de ajuda via aria-describedby', () => {
    render(<TextField label="Nome" helpText="Como aparece no documento." />);
    const input = screen.getByLabelText('Nome');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).toHaveAccessibleDescription('Como aparece no documento.');
  });

  it('marca erro com aria-invalid e usa a mensagem de erro como descrição', () => {
    render(<TextField label="Nome" helpText="Ajuda" error="Campo obrigatório." />);
    const input = screen.getByLabelText('Nome');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Campo obrigatório.');
  });

  it('preserva aria-describedby recebido', () => {
    render(
      <>
        <span id="extra">Nota extra</span>
        <TextField label="Nome" helpText="Ajuda" aria-describedby="extra" />
      </>,
    );
    expect(screen.getByLabelText('Nome')).toHaveAccessibleDescription('Nota extra Ajuda');
  });

  it('digita e repassa onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TextField label="Nome" onChange={onChange} />);
    await user.type(screen.getByLabelText('Nome'), 'Ana');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(screen.getByLabelText('Nome')).toHaveValue('Ana');
  });

  it('desabilitado não recebe foco nem digitação', async () => {
    const user = userEvent.setup();
    render(<TextField label="Nome" disabled />);
    await user.type(screen.getByLabelText('Nome'), 'x');
    expect(screen.getByLabelText('Nome')).toBeDisabled();
    expect(screen.getByLabelText('Nome')).toHaveValue('');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <TextField label="Padrão" helpText="Ajuda" />
        <TextField label="Erro" error="Obrigatório" />
        <TextField label="Desabilitado" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
