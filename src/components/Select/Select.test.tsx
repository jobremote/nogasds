import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Select } from './Select';

const options = (
  <>
    <option value="a">Opção A</option>
    <option value="b">Opção B</option>
  </>
);

describe('Select', () => {
  it('associa rótulo e começa no placeholder', () => {
    render(<Select label="Escolha">{options}</Select>);
    expect(screen.getByLabelText('Escolha')).toHaveValue('');
    expect(screen.getByText('Selecione')).toBeInTheDocument();
  });

  it('permite trocar a opção', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select label="Escolha" onChange={onChange}>
        {options}
      </Select>,
    );
    await user.selectOptions(screen.getByLabelText('Escolha'), 'b');
    expect(screen.getByLabelText('Escolha')).toHaveValue('b');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('aceita valor inicial e placeholder nulo', () => {
    render(
      <Select label="Escolha" defaultValue="a" placeholder={null}>
        {options}
      </Select>,
    );
    expect(screen.getByLabelText('Escolha')).toHaveValue('a');
    expect(screen.queryByText('Selecione')).toBeNull();
  });

  it('erro marca aria-invalid e descreve o campo', () => {
    render(
      <Select label="Escolha" error="Selecione uma opção.">
        {options}
      </Select>,
    );
    const select = screen.getByLabelText('Escolha');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAccessibleDescription('Selecione uma opção.');
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Select label="Padrão" helpText="Ajuda">
          {options}
        </Select>
        <Select label="Desabilitado" disabled>
          {options}
        </Select>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
