import Button from '../components/Button';
import ColorSelect from '../components/ColorSelect';
import Input from '../components/Input';

const Form = () => {
  const component = document.createElement('div');
  component.className = 'form';
  const test = (value: string) => console.log(value);
  const test2 = () => console.log('btn');

  const createCarWrap = document.createElement('div');
  createCarWrap.className = 'form__wrapper';

  const updateCarWrap = document.createElement('div');
  updateCarWrap.className = 'form__wrapper';

  const btnCarWrap = document.createElement('div');
  btnCarWrap.className = 'form__wrapper';

  createCarWrap.append(
    Input({ onChange: test }),
    ColorSelect({ onChange: test }),
    Button({ onClick: test2, title: 'create' }),
  );
  updateCarWrap.append(
    Input({ onChange: test }),
    ColorSelect({ onChange: test }),
    Button({ onClick: test2, title: 'update' }),
  );
  btnCarWrap.append(
    Button({ onClick: test2, title: 'race' }),
    Button({ onClick: test2, title: 'reset' }),
    Button({ onClick: test2, title: 'generate cars' }),
  );

  component.append(createCarWrap, updateCarWrap, btnCarWrap);

  return component;
};

export default Form;
