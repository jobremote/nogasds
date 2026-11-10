import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Cover } from './Cover';

const meta = {
  title: 'Componentes/Conteúdo/Cover (Capa)',
  component: Cover,
} satisfies Meta<typeof Cover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div className="sb-w320">
        <Cover {...args} />
      </div>
    </Canvas>
  ),
};

/** Fotos de exemplo geradas no próprio Storybook (sem rede). */
const photo =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='200'><rect width='640' height='200' fill='%23454309'/><circle cx='480' cy='60' r='60' fill='%239A4750'/></svg>";

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Tipo">
        <Cell label="Cor sólida" width={320}>
          <Cover />
        </Cell>
        <Cell label="Imagem sem foto" width={320}>
          <Cover placeholder />
        </Cell>
        <Cell label="Imagem" width={320}>
          <Cover src={photo} alt="Exemplo de capa" />
        </Cell>
      </Section>
    </Canvas>
  ),
};
