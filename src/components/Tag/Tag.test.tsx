import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Tag } from './Tag';

describe('Tag', () => {
  it('sem `selected` é um botão comum, sem aria-pressed', () => {
    render(<Tag>Rótulo</Tag>);
    expect(screen.getByRole('button', { name: 'Rótulo' })).not.toHaveAttribute('aria-pressed');
  });

  it('aplica a cor (neutro por padrão) e passa na acessibilidade', async () => {
    const { container, rerender } = render(<Tag>Rótulo</Tag>);
    expect(container.querySelector('.nds-tag')).toHaveClass('nds-tag--neutral');
    for (const color of ['wine', 'petrol', 'olive', 'rose', 'sky'] as const) {
      rerender(<Tag color={color}>Rótulo</Tag>);
      expect(container.querySelector('.nds-tag')).toHaveClass(`nds-tag--${color}`);
    }
    expect(await axe(container)).toHaveNoViolations();
  });

  it('com `selected` expõe aria-pressed e dispara onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(
      <Tag selected={false} onClick={onClick}>
        Rótulo
      </Tag>,
    );
    const button = screen.getByRole('button', { name: 'Rótulo' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <Tag selected onClick={onClick}>
        Rótulo
      </Tag>,
    );
    expect(screen.getByRole('button', { name: 'Rótulo' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('removível: botão de remover nomeado e com callback', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Rótulo</Tag>);
    await user.click(screen.getByRole('button', { name: 'Remover: Rótulo' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('desabilitado desabilita os dois botões', () => {
    render(
      <Tag disabled onRemove={() => undefined}>
        Rótulo
      </Tag>,
    );
    screen.getAllByRole('button').forEach((button) => expect(button).toBeDisabled());
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Tag>Padrão</Tag>
        <Tag selected>Selecionada</Tag>
        <Tag onRemove={() => undefined}>Removível</Tag>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
