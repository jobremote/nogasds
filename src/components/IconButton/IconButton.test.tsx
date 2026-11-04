import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('tem nome acessível pelo label e type="button"', () => {
    render(<IconButton icon="add" label="Adicionar" />);
    const button = screen.getByRole('button', { name: 'Adicionar' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('aplica variante e tamanho; fantasma e médio por padrão', () => {
    const { rerender } = render(<IconButton icon="add" label="A" />);
    expect(screen.getByRole('button')).toHaveClass('nds-button--ghost', 'nds-icon-button--md');
    rerender(<IconButton icon="add" label="A" variant="primary" size="sm" />);
    expect(screen.getByRole('button')).toHaveClass('nds-button--primary', 'nds-icon-button--sm');
  });

  it('dispara onClick e respeita disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<IconButton icon="add" label="A" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<IconButton icon="add" label="A" onClick={onClick} disabled />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<IconButton icon="close" label="Fechar" variant="outline" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
