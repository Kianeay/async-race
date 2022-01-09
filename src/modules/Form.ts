import { createCarApi, getCarApi } from '../api';
import Button from '../components/Button';
import ColorSelect from '../components/ColorSelect';
import Input from '../components/Input';

const Form = () => {
  const carState = {
    name: '',
    color: '#000',
  };
  const component = document.createElement('div');
  component.className = 'form';
  const inputName = (value: string) => {
    carState.name = value;
  };
  const inputColor = (value: string) => {
    carState.color = value;
  };

  const createCar = async () => {
    console.log(carState);
    await createCarApi(carState);
    getCarApi();
  };

  const createCarWrap = document.createElement('div');
  createCarWrap.className = 'form__wrapper';

  const updateCarWrap = document.createElement('div');
  updateCarWrap.className = 'form__wrapper';

  const btnCarWrap = document.createElement('div');
  btnCarWrap.className = 'form__wrapper';

  createCarWrap.append(
    Input({ onChange: inputName }),
    ColorSelect({ onChange: inputColor }),
    Button({ onClick: createCar, title: 'create' }),
  );
  updateCarWrap.append(
    Input({ onChange: createCar }),
    ColorSelect({ onChange: createCar }),
    Button({ onClick: createCar, title: 'update' }),
  );
  btnCarWrap.append(
    Button({ onClick: createCar, title: 'race' }),
    Button({ onClick: createCar, title: 'reset' }),
    Button({ onClick: createCar, title: 'generate cars' }),
  );

  component.append(createCarWrap, updateCarWrap, btnCarWrap);

  return component;
};

export default Form;
