import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Canvas, Section } from '../../docs/story-layout';
import { MentionList, type MentionItem } from './MentionList';

const items: MentionItem[] = [
  { id: 'a', label: 'Item de exemplo', detail: '2017 · Detalhe de exemplo' },
  { id: 'b', label: 'Item de exemplo: segundo', detail: '2025 · Detalhe de exemplo' },
  { id: 'c', label: 'Item parecido', detail: '2022 · Detalhe de exemplo' },
  { id: 'd', label: 'Item de exemplo: quarto', detail: '2020 · Detalhe de exemplo' },
];

const meta = {
  title: 'Componentes/Feed/Sugestões (menção)',
  component: MentionList,
  args: { label: 'Sugestões', items, activeIndex: 0, hint: '↑ ↓ navegar · Enter escolher · Esc fechar' },
} satisfies Meta<typeof MentionList>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(args: React.ComponentProps<typeof MentionList>) {
  const [active, setActive] = useState(args.activeIndex ?? 0);
  return (
    <Canvas>
      <div style={{ width: 510 }}>
        <MentionList {...args} activeIndex={active} onActiveChange={setActive} />
      </div>
    </Canvas>
  );
}

export const Playground: Story = {
  render: (args) => <Interactive {...args} />,
};

export const TodosOsEstados: Story = {
  render: () => (
    <Canvas>
      <Section title="Com a primeira ativa, sem ativa e vazia (Figma: Sugestões de jogo (@))">
        <div style={{ width: 510 }}>
          <MentionList {...meta.args} />
        </div>
        <div style={{ width: 510 }}>
          <MentionList {...meta.args} activeIndex={-1} hint={undefined} />
        </div>
        <div style={{ width: 510 }}>
          <MentionList {...meta.args} items={[]} emptyMessage="Nenhum resultado." hint={undefined} />
        </div>
      </Section>
    </Canvas>
  ),
};
