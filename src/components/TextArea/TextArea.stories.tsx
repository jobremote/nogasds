import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { TextArea } from './TextArea';

const meta = {
  title: 'Componentes/Formulários/Campo de texto multilinha',
  component: TextArea,
  args: { label: 'Rótulo', placeholder: 'Escreva aqui', helpText: 'Texto de ajuda opcional.' },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div className="sb-w320">
        <TextArea {...args} />
      </div>
    </Canvas>
  ),
};

const states = [
  { key: 'Padrão', hover: false, focus: false, props: {} },
  { key: 'Hover', hover: true, focus: false, props: {} },
  { key: 'Foco', hover: false, focus: true, props: {} },
  { key: 'Erro', hover: false, focus: false, props: { error: 'Campo obrigatório.' } },
  { key: 'Desabilitado', hover: false, focus: false, props: { disabled: true } },
];

export const TodosOsEstados: Story = {
  parameters: {
    pseudo: { hover: ['.sb-hover .nds-text-field__control'], focusWithin: ['.sb-focus .nds-text-field__control'] },
  },
  render: () => (
    <Canvas>
      {[false, true].map((filled) => (
        <Section key={String(filled)} title={`Preenchido: ${filled ? 'Sim' : 'Não'}`}>
          {states.map(({ key, hover, focus, props }) => (
            <Cell key={key} label={key} hover={hover} focus={focus} width={320}>
              <TextArea
                label="Rótulo"
                placeholder="Escreva aqui"
                helpText="Texto de ajuda opcional."
                defaultValue={filled ? 'Um texto de exemplo com mais de uma linha, para mostrar o campo preenchido.' : ''}
                {...props}
              />
            </Cell>
          ))}
        </Section>
      ))}
    </Canvas>
  ),
};
