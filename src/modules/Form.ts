import Button from '../components/Button';
import ColorSelect from '../components/ColorSelect';
import Input from '../components/Input';

const Form = () => {
  const component = document.createElement('div');
  component.className = 'form';
  const test = (value:string) => console.log(value);
  const test2 = () => console.log('btn');

  const createCarWrap = document.createElement('div');
  createCarWrap.className = 'form__wrapper';

  createCarWrap.append(Input({ onChange: test }), ColorSelect({ onChange: test }), Button({ onClick: test2, title: 'create' }));

  component.append(createCarWrap);

  return component;
};

export default Form;
