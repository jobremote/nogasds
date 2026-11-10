import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/axe';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

describe('Modal', () => {
  it('fechado, não mostra o conteúdo', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Título">
        Corpo
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('aberto, é um diálogo nomeado pelo título, com corpo e rodapé', () => {
    render(
      <Modal open onClose={() => {}} title="Título" footer={<Button>Salvar</Button>}>
        Corpo
      </Modal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Título' });
    expect(dialog).toHaveTextContent('Corpo');
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });

  it('o botão de fechar chama onClose', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Título">
        Corpo
      </Modal>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('o nome do botão de fechar é configurável', () => {
    render(
      <Modal open onClose={() => {}} title="Título" closeLabel="Close">
        Corpo
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('a tecla Esc (evento cancel) chama onClose sem fechar sozinho', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Título">
        Corpo
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    const event = new Event('cancel', { cancelable: true, bubbles: false });
    dialog.dispatchEvent(event);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('clicar fora do conteúdo (no fundo) chama onClose; clicar dentro não', async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Título">
        <p>Corpo</p>
      </Modal>,
    );
    await userEvent.click(screen.getByText('Corpo'));
    expect(onClose).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <Modal open onClose={() => {}} title="Título" footer={<Button>Salvar</Button>}>
        Corpo
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
