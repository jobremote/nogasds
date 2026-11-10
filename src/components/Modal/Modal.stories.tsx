import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas } from '../../docs/story-layout';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

const meta = {
  title: 'Componentes/Feedback/Modal',
  component: Modal,
  args: { open: false, onClose: () => {}, title: 'Título do modal' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof Modal>) {
  const [open, setOpen] = useState(false);
  return (
    <Canvas>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setOpen(false)}>Salvar</Button>
          </>
        }
      >
        Conteúdo do modal: um texto de apoio ou um formulário.
      </Modal>
    </Canvas>
  );
}

export const Playground: Story = {
  render: (args) => <Demo {...args} />,
};
