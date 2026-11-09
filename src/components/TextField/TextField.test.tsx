import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
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

  it('mostra o ícone trailing depois do campo, decorativo por padrão', () => {
    const { container } = render(<TextField label="Busca" trailingIcon={<Icon name="search" />} />);
    const control = container.querySelector('.nds-text-field__control')!;
    expect(control.lastElementChild).toHaveClass('nds-text-field__trailing');
    expect(control.querySelector('.nds-text-field__trailing svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByLabelText('Busca')).toBeInTheDocument();
  });

  it('não cria o espaço do ícone sem trailingIcon', () => {
    const { container } = render(<TextField label="Nome" />);
    expect(container.querySelector('.nds-text-field__trailing')).toBeNull();
  });

  it('aceita um botão de mostrar/ocultar senha como trailing', async () => {
    const user = userEvent.setup();
    function Password() {
      const [visible, setVisible] = useState(false);
      return (
        <TextField
          label="Senha"
          type={visible ? 'text' : 'password'}
          defaultValue="segredo"
          trailingIcon={
            <IconButton
              size="sm"
              icon={visible ? 'visibility-off' : 'visibility'}
              label={visible ? 'Ocultar senha' : 'Mostrar senha'}
              aria-pressed={visible}
              onClick={() => setVisible((v) => !v)}
            />
          }
        />
      );
    }
    render(<Password />);
    const input = screen.getByLabelText('Senha');
    expect(input).toHaveAttribute('type', 'password');
    await user.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Ocultar senha' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <TextField label="Padrão" helpText="Ajuda" />
        <TextField label="Erro" error="Obrigatório" />
        <TextField label="Desabilitado" disabled />
        <TextField label="Com ícone" trailingIcon={<Icon name="search" />} />
        <TextField
          label="Senha"
          type="password"
          trailingIcon={<IconButton size="sm" icon="visibility" label="Mostrar senha" />}
        />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
