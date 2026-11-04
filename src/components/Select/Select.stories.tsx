import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Cell, Section } from '../../docs/story-layout';
import { Select } from './Select';

const options = (
  <>
    <option value="a">Opção A</option>
    <option value="b">Opção B</option>
    <option value="c">Opção C</option>
  </>
);

const meta = {
  title: 'Componentes/Formulários/Combo box',
  component: Select,
  args: { label: 'Rótulo', helpText: 'Escolha uma opção da lista.', children: options },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Canvas>
      <div className="sb-w320">
        <Select {...args} />
      </div>
    </Canvas>
  ),
};

const states = [
  { key: 'Padrão', hover: false, focus: false, props: {} },
  { key: 'Hover', hover: true, focus: false, props: {} },
  { key: 'Foco', hover: false, focus: true, props: {} },
  { key: 'Erro', hover: false, focus: false, props: { error: 'Selecione uma opção.' } },
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
              <Select
                label="Rótulo"
                helpText="Escolha uma opção da lista."
                defaultValue={filled ? 'a' : ''}
                {...props}
              >
                {options}
              </Select>
            </Cell>
          ))}
        </Section>
      ))}
    </Canvas>
  ),
};
