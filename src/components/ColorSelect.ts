interface IColorSelect {onChange: (value: string) => void;}

const ColorSelect = ({ onChange }: IColorSelect) => {
  const component = document.createElement('input');
  component.type = 'color';
  component.addEventListener('input', (e: Event) => {
    onChange((e.target as HTMLInputElement).value);
  });
  return component;
};

export default ColorSelect;
