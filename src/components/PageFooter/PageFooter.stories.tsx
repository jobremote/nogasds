import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { PageFooter } from './PageFooter';

const links = [
  { label: 'Termos', href: '#termos' },
  { label: 'Privacidade', href: '#privacidade' },
];
const attribution = (
  <>
    Fornecido por <a href="#fonte">Fonte</a>
  </>
);

const meta = {
  title: 'Componentes/Navegação/Rodapé da página',
  component: PageFooter,
  args: { attribution, links },
} satisfies Meta<typeof PageFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <PageFooter {...args} />
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Variações (Figma: Rodapé da página)">
        <Cell label="Atribuição e links">
          <PageFooter attribution={attribution} links={links} />
        </Cell>
        <Cell label="Só atribuição">
          <PageFooter attribution={attribution} />
        </Cell>
        <Cell label="Só links">
          <PageFooter links={links} />
        </Cell>
      </Section>
    </Canvas>
  ),
};
