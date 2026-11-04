import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Rating } from './Rating';

const meta = {
  title: 'Componentes/Formulários/Avaliação por estrelas',
  component: Rating,
  args: { label: 'Nota', defaultValue: 3 },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <Rating {...args} />
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Nota 0 a 5">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <Cell key={n} label={`Nota ${n}`}>
            <Rating label="Nota" value={n} onChange={() => undefined} />
          </Cell>
        ))}
      </Section>
      <Section title="Somente leitura e desabilitado">
        <Cell label="Somente leitura">
          <Rating label="Nota" value={4} readOnly />
        </Cell>
        <Cell label="Desabilitado">
          <Rating label="Nota" value={4} disabled />
        </Cell>
      </Section>
    </Canvas>
  ),
};
