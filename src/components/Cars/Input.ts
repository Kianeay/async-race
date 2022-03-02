interface IInput {
onChange: (value: string) => void;
}

const Input = ({ onChange }: IInput) => {
  const component = document.createElement('input');
  component.addEventListener('input', (e: Event) => {
    onChange((e.target as HTMLInputElement).value);
  });
  return component;
};

export default Input;
