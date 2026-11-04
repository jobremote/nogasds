import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Radio } from './Radio';

const group = (disabled = false) => (
  <fieldset>
    <legend>Escolha</legend>
    <Radio name="g" value="a" label="A" />
    <Radio name="g" value="b" label="B" />
    <Radio name="g" value="c" label="C" disabled={disabled} />
  </fieldset>
);

describe('Radio', () => {
  it('seleciona uma opção por vez ao clicar no rótulo', async () => {
    const user = userEvent.setup();
    render(group());
    await user.click(screen.getByText('A'));
    expect(screen.getByRole('radio', { name: 'A' })).toBeChecked();
    await user.click(screen.getByText('B'));
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'A' })).not.toBeChecked();
  });

  it('navega com as setas dentro do grupo', async () => {
    const user = userEvent.setup();
    render(group());
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
  });

  it('desabilitado não pode ser escolhido', async () => {
    const user = userEvent.setup();
    render(group(true));
    await user.click(screen.getByText('C'));
    expect(screen.getByRole('radio', { name: 'C' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'C' })).not.toBeChecked();
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(group(true));
    expect(await axe(container)).toHaveNoViolations();
  });
});
