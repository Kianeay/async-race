interface IButton {
  onClick: () => void;
  title: string;
}

const Button = ({ onClick, title }: IButton) => {
  const component = document.createElement('button');
  component.textContent = title;
  component.className = 'button';

  component.addEventListener('click', onClick);
  return component;
};

export default Button;
