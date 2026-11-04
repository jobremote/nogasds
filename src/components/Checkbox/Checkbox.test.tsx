import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Link } from '../Link/Link';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('alterna ao clicar no rótulo', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Aceito" onChange={onChange} />);
    const box = screen.getByRole('checkbox', { name: 'Aceito' });
    expect(box).not.toBeChecked();
    await user.click(screen.getByText('Aceito'));
    expect(box).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('alterna com a barra de espaço', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Aceito" />);
    await user.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('aceita links no rótulo e os mantém acessíveis', () => {
    render(
      <Checkbox
        label={
          <>
            Li os <Link href="#termos">termos</Link>
          </>
        }
      />,
    );
    expect(screen.getByRole('link', { name: 'termos' })).toHaveAttribute('href', '#termos');
    expect(screen.getByRole('checkbox', { name: 'Li os termos' })).toBeInTheDocument();
  });

  it('mostra erro com aria-invalid e descrição', () => {
    render(<Checkbox label="Aceito" error="Aceite para continuar." />);
    const box = screen.getByRole('checkbox');
    expect(box).toHaveAttribute('aria-invalid', 'true');
    expect(box).toHaveAccessibleDescription('Aceite para continuar.');
  });

  it('desabilitado não alterna', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Aceito" disabled />);
    await user.click(screen.getByText('Aceito'));
    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Checkbox label="Padrão" />
        <Checkbox label="Marcado" defaultChecked />
        <Checkbox label="Erro" error="Obrigatório" />
        <Checkbox label="Desabilitado" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
