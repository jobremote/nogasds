import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Section } from '../../docs/story-layout';
import { Badge } from '../Badge/Badge';
import { MediaTag } from '../MediaTag/MediaTag';
import { Post } from '../Post/Post';
import { GroupedTags } from './GroupedTags';

const groups = [
  {
    id: 'done',
    name: 'Concluído',
    label: <Badge tone="success">Concluído</Badge>,
    children: (
      <>
        <MediaTag href="#a">Item de exemplo</MediaTag>
        <MediaTag href="#b">Outro item</MediaTag>
      </>
    ),
  },
  {
    id: 'doing',
    name: 'Em andamento',
    label: <Badge tone="info">Em andamento</Badge>,
    children: <MediaTag href="#c">Item em andamento</MediaTag>,
  },
  {
    id: 'none',
    name: 'Sem status',
    children: <MediaTag href="#d">Item sem status</MediaTag>,
  },
];

const meta = {
  title: 'Componentes/Feed/Marcas agrupadas',
  component: GroupedTags,
  args: { groups },
} satisfies Meta<typeof GroupedTags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div style={{ width: 590 }}>
        <GroupedTags {...args} />
      </div>
    </Canvas>
  ),
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Solto e dentro do Post, no tagsAfter (Figma: Post publicado)">
        <div style={{ width: 590 }}>
          <GroupedTags groups={groups} />
        </div>
        <div style={{ width: 640 }}>
          <Post author="Pessoa Exemplo" meta="@pessoa · há 2 h" tagsAfter={<GroupedTags groups={groups} />}>
            Texto de exemplo da publicação, citando @Item de exemplo e @Outro item.
          </Post>
        </div>
      </Section>
    </Canvas>
  ),
};
